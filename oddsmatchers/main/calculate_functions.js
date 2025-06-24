


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
        for (let key in data) {
            if (typeof data[key] === 'number' && !isNaN(data[key])) {
                data[key] = data[key].toFixed(2);
            }
        }

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

        // loop over all values in data and if number then round to fixed (2)
        for (let key in data) {
            if (typeof data[key] === 'number' && !isNaN(data[key])) {
                data[key] = data[key].toFixed(2);
            }
        }

    }
    
    return data;

}







/* 



async function add_to_profit_tracker(data) {

    let date = convertDateToFullYear(data.date_and_time.split(' ')[0]);

    let bookie = data.bookmaker;
    let exchange = data.exchange;

    let calculator = 'standard';
    let stakereturned = false;
    let bet_type = 'Qualifying Bet on ';
    if (calculate_type == 'free' || calculate_type == 'free-sr') {
      calculator = 'free';
      bet_type = 'Free Bet from ';
    }
    if (calculate_type == 'free-sr') {
      stakereturned = true;
      bet_type = 'Free Bet (SR) from '
    }

    let description = bet_type + bookie + ' betting on ' + $w('#backbet').text.replace('Back', '').trim() + ' at the ' + data.fixture + ', lay bet placed on ' + exchange + ' @' + $w('#laybet').text.split('@')[1] + ".";

    if (data.sport == 'Football') {
      description = bet_type + bookie + ' betting on ' + $w('#backbet').text.replace('Back', '').trim() + ' for ' + data.fixture + ', lay bet placed on ' + exchange + ' @' + $w('#laybet').text.split('@')[1] + ".";
    }
    

    if ($w('#description').value != '') {
      description = $w('#description').value;
    }
    
    const betID = `bet_${Date.now()}_${Math.floor(Math.random() * 1000)}`;


    let qualifying_loss = $w('#totalsecond').text;
    let potential_profit = $w('#totalfirst').text;

    if (parseFloat($w('#totalfirst').text.replace('£', '')) < parseFloat($w('#totalsecond').text.replace('£', ''))) {

      qualifying_loss = $w('#totalfirst').text;
      potential_profit = $w('#totalsecond').text;

    }


    const newBet = {
      iscalc: true,
      calculator: calculator,
      backodds: $w('#backodds').value,
      layodds: $w('#layodds').value,
      backstake: $w('#backstake').value,
      commission: $w('#laycomm').value,
      stakereturned: stakereturned,
      date: date,
      bookie: bookie,
      exchange: exchange,
      description: description.replace(/\s+/g, " "),
      actualprofit: $w('#ql-pp-text').text,
      potentialprofit: potential_profit,
      qloss: qualifying_loss,
      complete: false,
      betId: betID,
      userId: userId,
      oddsmatcher_type: 'Standard',
      bookmaker_link: data.bookmaker_link,
      exchange_link: data.exchange_link,
      fixture: data.fixture,
      outcome: data.outcome,
       
    };



      // ADD TO PROFIT TRACKER

      await wixData.insert("ProfitTracker", newBet)
      .then(() => {
        setTimeout(() => {
          wixLocation.to("/betting-profit-tracker");
        }, 1000);
      });


}


*/



