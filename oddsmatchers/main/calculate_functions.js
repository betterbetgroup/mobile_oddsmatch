


function process_and_round_numbers(data) {

    for (let key in data) {
        if (typeof data[key] === 'number' && !isNaN(data[key])) {
            if (data[key] === Infinity || data[key] === -Infinity) {
                data.incomplete_data = true;
            } else {
                data[key] = data[key].toFixed(2);
            }
        }
    }

    return data;

}

function get_back_implied_place_odds(bookmaker_fraction, each_way_odds) {
    let bookmakerFraction = bookmaker_fraction.split('/');
    let numerator = parseInt(bookmakerFraction[0], 10);
    let denominator = parseInt(bookmakerFraction[1], 10);
    bookmakerFraction = numerator / denominator;
    return (((each_way_odds - 1) * bookmakerFraction) + 1)
}

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

        data.bookmaker_profit_if_back_win = ((data.back_stake * data.back_odds) - data.back_stake);    
        data.lay_stake = ((data.bookmaker_profit_if_back_win + data.back_stake)/(data.lay_odds-data.lay_commission));
        data.exchange_profit_if_back_win = - data.lay_stake * (data.lay_odds - 1);
        data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;

        data.bookmaker_profit_if_lay_win = - data.back_stake;
        data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
        data.total_profit_if_lay_win = data.exchange_profit_if_lay_win + data.bookmaker_profit_if_lay_win;


        data.twoupbookmaker = data.bookmaker_profit_if_back_win;
        data.twoupexchange = data.exchange_profit_if_lay_win;
        data.twouptotal = data.twoupbookmaker + data.twoupexchange;


        data.qualifying_loss = data.total_profit_if_back_win;
        if (data.total_profit_if_back_win > data.total_profit_if_lay_win) {
            data.qualifying_loss = data.total_profit_if_lay_win;
        }

        data.potential_profit = data.twouptotal;

        // loop over all values in data and if number then round to fixed (2)
        data = process_and_round_numbers(data);

    }
    
    return data;

}


export function calculate_standard(data) {

    data.incomplete_data = false;

    if (!isNaN(data.back_odds) && !isNaN(data.lay_odds)) {
        data.rating = (((data.back_odds / data.lay_odds) * 100).toFixed(2)).toString() + '%'
    
    } else {
        data.rating = '0%';
    }

    if (isNaN(data.back_stake) || isNaN(data.back_odds) || isNaN(data.lay_odds) || isNaN(data.lay_commission)) {

        data.incomplete_data = true;

    } else {

        if (data.laytype == 'Standard') {
                
            if (!data.isfree) {

                data.bookmaker_profit_if_back_win = ((data.back_stake * data.back_odds) - data.back_stake);   
                data.lay_stake = ((data.bookmaker_profit_if_back_win + data.back_stake)/(data.lay_odds-data.lay_commission));
                data.exchange_profit_if_back_win = - data.lay_stake * (data.lay_odds - 1);
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;

                data.bookmaker_profit_if_lay_win = - data.back_stake;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
                data.total_profit_if_lay_win = data.exchange_profit_if_lay_win + data.bookmaker_profit_if_lay_win;
        
            } else if (data.isfree) {
        
                data.bookmaker_profit_if_back_win = ((data.back_stake * data.back_odds) - data.back_stake);
                data.lay_stake = ((data.bookmaker_profit_if_back_win) / (data.lay_odds - data.lay_commission));
                data.exchange_profit_if_back_win = - data.lay_stake * (data.lay_odds - 1);
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;


                data.bookmaker_profit_if_lay_win = 0;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
                data.total_profit_if_lay_win = data.exchange_profit_if_lay_win + data.bookmaker_profit_if_lay_win;
        
            } 

        } else if (data.laytype == 'Underlay') {
            
            if (!data.isfree) {

                data.bookmaker_profit_if_back_win = ((data.back_stake * data.back_odds) - data.back_stake); 
                data.lay_stake = data.back_stake / (1 - data.lay_commission);
                data.exchange_profit_if_back_win = - data.lay_stake * (data.lay_odds - 1);
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;

                data.bookmaker_profit_if_lay_win = - data.back_stake;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
                data.total_profit_if_lay_win = data.exchange_profit_if_lay_win + data.bookmaker_profit_if_lay_win;

            } else if (data.isfree) {

                data.bookmaker_profit_if_back_win = ((data.back_stake * data.back_odds) - data.back_stake); 
                data.lay_stake = 0;
                data.exchange_profit_if_back_win = 0;
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;

                data.bookmaker_profit_if_lay_win = 0;
                data.exchange_profit_if_lay_win = 0;
                data.total_profit_if_lay_win = data.bookmaker_profit_if_lay_win + data.exchange_profit_if_lay_win;

            }


        } else if (data.laytype == 'Overlay') {


            if (!data.isfree) {

                data.bookmaker_profit_if_back_win = ((data.back_stake * data.back_odds) - data.back_stake);
                data.lay_stake = data.bookmaker_profit_if_back_win / (data.lay_odds - 1);
                data.exchange_profit_if_back_win = - data.lay_stake * (data.lay_odds - 1);
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;

                data.bookmaker_profit_if_lay_win = - data.back_stake;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
                data.total_profit_if_lay_win = data.exchange_profit_if_lay_win + data.bookmaker_profit_if_lay_win;


            } else if (data.isfree) {


                data.bookmaker_profit_if_back_win = ((data.back_stake * data.back_odds) - data.back_stake);
                data.lay_stake = ((data.bookmaker_profit_if_back_win) / (data.lay_odds - 1));
                data.exchange_profit_if_back_win = - data.lay_stake * (data.lay_odds - 1);
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;

                data.bookmaker_profit_if_lay_win = 0;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
                data.total_profit_if_lay_win = data.exchange_profit_if_lay_win + data.bookmaker_profit_if_lay_win;

            }


        }
        
        data.qualifying_loss = data.total_profit_if_back_win;
        data.potential_profit = data.total_profit_if_lay_win;
        if (data.total_profit_if_back_win > data.total_profit_if_lay_win) {
            data.qualifying_loss = data.total_profit_if_lay_win;
            data.potential_profit = data.total_profit_if_back_win;
        }

        data.ROI = (data.qualifying_loss / (data.back_stake + (data.exchange_profit_if_back_win * - 1))) * 100;

        // loop over all values in data and if number then round to fixed (2)
        data = process_and_round_numbers(data);

    }
    
    return data;

}


export function calculate_each_way_and_extra_place(data, is_extra_place) {

    data.incomplete_data = false;

    if (!isNaN(data.each_way_odds) && !isNaN(data.exchange_win_odds) && !isNaN(data.exchange_place_odds) && data.bookmaker_fraction) {
        
        data.back_place_odds = get_back_implied_place_odds(data.bookmaker_fraction, data.each_way_odds)
        data.rating = (((data.each_way_odds + data.back_place_odds) / (data.exchange_win_odds + data.exchange_place_odds)) * 100).toFixed(2) + '%';

    } else {
        data.rating = '0%';
    }

    if (isNaN(data.each_way_stake) || isNaN(data.each_way_odds) || isNaN(data.exchange_win_odds) || isNaN(data.exchange_win_commission) || isNaN(data.exchange_place_odds) || isNaN(data.exchange_place_commission)) {

        data.incomplete_data = true;

    } else {

      data.bookmaker_profit_win_wins = (data.each_way_stake * data.each_way_odds) - data.each_way_stake
      data.lay_stake_win = ((data.bookmaker_profit_win_wins + data.each_way_stake) / (data.exchange_win_odds - data.exchange_win_commission));
      data.exchange_profit_win_wins = - data.lay_stake_win * (data.exchange_win_odds - 1);


      data.bookmaker_profit_place_place = ((data.each_way_stake * data.back_place_odds) - data.each_way_stake)
      data.lay_stake_place = (data.bookmaker_profit_place_place + data.each_way_stake) / (data.exchange_place_odds - data.exchange_place_commission);
      data.exchange_profit_place_place = - data.lay_stake_place * (data.exchange_place_odds - 1);

      data.total_profit_if_wins = data.bookmaker_profit_win_wins + data.exchange_profit_win_wins + data.bookmaker_profit_place_place + data.exchange_profit_place_place;




      
      data.bookmaker_profit_win_place = - data.each_way_stake;
      data.exchange_profit_win_place = data.lay_stake_win * (1 - data.exchange_win_commission);

      data.bookmaker_profit_place_place = data.bookmaker_profit_place_place;
      data.exchange_profit_place_place = data.exchange_profit_place_place;

      data.total_profit_if_place = data.bookmaker_profit_win_place + data.exchange_profit_win_place + data.bookmaker_profit_place_place + data.exchange_profit_place_place;



      


      data.bookmaker_profit_win_none = - data.each_way_stake;
      data.exchange_profit_win_none = data.lay_stake_win * (1 - data.exchange_win_commission);

      data.bookmaker_profit_place_none = - data.each_way_stake;
      data.exchange_profit_place_none = data.lay_stake_place * (1 - data.exchange_place_commission);

      data.total_profit_if_none = data.bookmaker_profit_win_none + data.exchange_profit_win_none + data.bookmaker_profit_place_none + data.exchange_profit_place_none;






      let list_of_profits = [data.total_profit_if_wins, data.total_profit_if_place, data.total_profit_if_none];
      data.qualifying_loss = list_of_profits.sort((a, b) => a - b)[0]; // gets the lowest value
      data.potential_profit = data.qualifying_loss;



      if (is_extra_place) {

          data.total_profit_if_extra_place = data.bookmaker_profit_win_place + data.exchange_profit_win_place + data.bookmaker_profit_place_place + data.exchange_profit_place_none;

          data.potential_profit = data.total_profit_if_extra_place;

          // VARIABLES FOR EXPLANATION TEXT

          data.bookmaker_profit_if_extra_place = (- data.each_way_stake + data.bookmaker_profit_place_place);


          data.combined_profit = parseFloat(data.qualifying_loss.toString().replace('-', '')) + parseFloat(data.potential_profit.toString().replace('-', ''));
          if (data.qualifying_loss >= 0) {
            data.implied_odds = '1000';
          } else {
            data.implied_odds = (data.combined_profit / parseFloat(data.qualifying_loss.toString().replace('-', '')));
          } 

      }





      // SOME VARIABLES FOR THE EXPLANATION TEXT 
      data.total_bookmaker_gain_if_win_and_place = (data.bookmaker_profit_win_wins + data.bookmaker_profit_place_place);

      data.total_bookmaker_gain_if_not_win_but_places = (- data.each_way_stake + data.bookmaker_profit_place_place);

      data.total_bookmaker_loss_if_not_win_or_place = (- data.each_way_stake * 2);



      // loop over all values in data and if number then round to fixed (2)
      data = process_and_round_numbers(data);

    }
    
    return data;


}




