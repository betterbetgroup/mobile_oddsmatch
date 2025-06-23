


export function calculate_2up_bet_data(data) {

    data.incomplete_data = false;

    if (!isNaN(data.back_odds) && !isNaN(data.lay_odds)) {
        data.rating = (((data.back_odds / data.lay_odds) * 100).toFixed(2)).toString() + '%'
    
    } else {
        data.rating = '0%';
    }

    if (isNaN(data.back_stake) || isNaN(data.back_odds) || isNaN(data.lay_odds) || isNaN(data.lay_commission)) {

        data.incomplete_data = true;

    } else {

        data.bookmaker_profit_back_win = ((data.back_stake * data.back_odds) - data.back_stake);    
        data.lay_stake = ((data.bookmaker_profit_back_win + data.back_stake)/(data.lay_odds-data.lay_commission));
        data.exchange_profit_if_back_win = - data.lay_stake * (data.lay_odds - 1);
        data.total_profit_if_back_win = data.bookmaker_profit_back_win + data.exchange_profit_if_back_win;

        data.bookmaker_profit_if_lay_win = - data.back_stake;
        data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
        data.total_profit_if_lay_win = data.exchange_profit_if_lay_win + data.bookmaker_profit_if_lay_win;


        data.twoupbookmaker = data.bookmaker_profit_back_win;
        data.twoupexchange = data.exchange_profit_if_lay_win;
        data.twouptotal = data.twoupbookmaker + data.twoupexchange;


        data.qualifying_loss = data.total_profit_if_back_win;
        data.potential_profit = data.total_profit_if_lay_win;
        if (data.total_profit_if_back_win > data.total_profit_if_lay_win) {
            data.qualifying_loss = data.total_profit_if_lay_win;
            data.potential_profit = data.total_profit_if_back_win;
        }

        // loop over all values in data and if number then round to fixed (2)
        for (let key in data) {
            if (typeof data[key] === 'number' && !isNaN(data[key])) {
                data[key] = data[key].toFixed(2);
            }
        }

    }
    
    return data;

}







