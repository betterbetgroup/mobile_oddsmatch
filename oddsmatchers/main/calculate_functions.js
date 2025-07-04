


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
        data.rating = (((data.back_odds / data.lay_odds) * 100).toFixed(2)).toString() + '%';
    
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


export function calculate_dutching(data) {

    data.incomplete_data = false;

    if (!data.outcomes) {
        data.incomplete_data = true;
        return data;
    }

    // Calculate rating for any number of outcomes
    const oddsValues = [];
    const commissionValues = [];
    let outcomeIndex = 1;
    
    // Collect all odds values using numbered keys
    while (data[`outcome${outcomeIndex}_odds`] !== undefined) {
        const odds = data[`outcome${outcomeIndex}_odds`];
        if (!isNaN(odds)) {
            oddsValues.push(odds);
        }
        outcomeIndex++;
    }

    // Reset outcomeIndex for commission collection
    outcomeIndex = 1;
    
    // Collect all commission values using numbered keys
    while (data[`outcome${outcomeIndex}_commission`] !== undefined) {
        const commission = data[`outcome${outcomeIndex}_commission`];
        if (!isNaN(commission)) {
            commissionValues.push(commission);
        }
        outcomeIndex++;
    }

    // check that length of oddsValues is equal to data.outcomes
    if (oddsValues.length != data.outcomes) {
        data.incomplete_data = true;
        return data;
    }
    
    // Calculate rating if we have valid odds
    if (oddsValues.length > 0) {
        const sumOfReciprocals = oddsValues.reduce((sum, odds) => sum + (1 / odds), 0);
        data.rating = ((1 / sumOfReciprocals) * 100).toFixed(2) + '%';
    }

    // then check commisssions and return if missing any 
    if ((commissionValues.length != data.outcomes) || !data.stake) {
        data.incomplete_data = true;
        return data;
    }
    

    if (data.target == 'First') {

        data.outcome1_stake = data.stake;

        data = calculate_dutching_target_first(data);
        
    } else if (data.target == 'Total') {

        data.total_stake = data.stake;

        data = calculate_dutching_target_total(data);

    }


    data.qualifying_loss = data.profit;
    data.potential_profit = data.profit;







    // EXTRA VARIABLES FOR EXPLANATION TEXT
    if (!data.isfree) {
        data.outcome1_w_bookmaker_profit = data.outcome1_return - data.outcome1_stake;
    } else {
        data.outcome1_w_bookmaker_profit = data.outcome1_return;
    }
    data.outcome2_w_bookmaker_profit = data.outcome2_return - data.outcome2_stake;
    if (data.outcomes >= 3) {
        data.outcome3_w_bookmaker_profit = data.outcome3_return - data.outcome3_stake;
    }



    data.total_profit_if_outcome1 = (data.outcome1_w_bookmaker_profit - data.outcome2_stake);
    data.total_profit_if_outcome2 = (data.outcome2_w_bookmaker_profit - data.outcome1_stake);
    if (data.outcomes == 3) {
        data.total_profit_if_outcome3 = (data.outcome3_w_bookmaker_profit - data.outcome1_stake - data.outcome2_stake);
        data.total_profit_if_outcome1 = (data.total_profit_if_outcome1 - data.outcome3_stake);
        data.total_profit_if_outcome2 = (data.total_profit_if_outcome2 - data.outcome3_stake);
    }

    if (data.isfree && data.target == 'First') {
        data.total_profit_if_outcome2 = (data.outcome2_w_bookmaker_profit);
        if (data.outcomes >= 3) {
            data.total_profit_if_outcome3 = (data.outcome3_w_bookmaker_profit - data.outcome2_stake);
            data.total_profit_if_outcome2 = data.total_profit_if_outcome2 - data.outcome3_stake;
        }
    } 


    // loop over all values in data and if number then round to fixed (2)
    data = process_and_round_numbers(data);

    return data;

}


function calculate_dutching_target_first(data) {
    
    // Calculate stakes and returns for all outcomes
    let outcomeIndex = 1;
    let totalStakes = 0;

    // Calculate all_returns using outcome1 - free is below
    data.all_returns = data.outcome1_stake * data.outcome1_odds - (data.outcome1_stake * (data.outcome1_odds - 1) * data.outcome1_commission);
    if (data.isfree) {
        data.all_returns = data.outcome1_stake * (data.outcome1_odds - 1) - (data.outcome1_stake * (data.outcome1_odds - 1) * data.outcome1_commission);
        data.outcome1_return = data.all_returns;
        outcomeIndex++;
    }
    
    // Loop through all outcomes to calculate stakes and returns
    while (data[`outcome${outcomeIndex}_odds`] !== undefined) {
        const odds = data[`outcome${outcomeIndex}_odds`];
        const commission = data[`outcome${outcomeIndex}_commission`];
        
        // Calculate stake for this outcome
        data[`outcome${outcomeIndex}_stake`] = data.all_returns / (odds - (odds - 1) * commission);
        
        // Calculate return for this outcome
        data[`outcome${outcomeIndex}_return`] = data[`outcome${outcomeIndex}_stake`] * odds - (data[`outcome${outcomeIndex}_stake`] * (odds - 1) * commission);
        
        // Add to total stakes
        totalStakes += data[`outcome${outcomeIndex}_stake`];
        
        outcomeIndex++;
    }

    // Calculate profit: all_returns minus all stakes
    data.profit = data.all_returns - totalStakes;
    
    return data;
}


function calculate_dutching_target_total(data) {


    // Calculate effective odds for all outcomes
    let outcomeIndex = 1;
    let totalValue = 0;
    
    // Loop through all outcomes to calculate effective odds
    while (data[`outcome${outcomeIndex}_odds`] !== undefined) {
        const odds = data[`outcome${outcomeIndex}_odds`];
        const commission = data[`outcome${outcomeIndex}_commission`];
        
        if (!isNaN(odds) && !isNaN(commission)) {
            // Calculate effective odds for this outcome
            data[`outcome${outcomeIndex}_effective_odds`] = (odds - 1) * (1 - commission) + 1;
            
            // Add reciprocal to total value
            totalValue += (1 / data[`outcome${outcomeIndex}_effective_odds`]);
        }
        
        outcomeIndex++;
    }
    
    data.total_value = totalValue;

    // Reset outcomeIndex for stake calculations
    outcomeIndex = 1;
    // Calculate stakes for all outcomes
    while (data[`outcome${outcomeIndex}_odds`] !== undefined) {
        const odds = data[`outcome${outcomeIndex}_odds`];
        const commission = data[`outcome${outcomeIndex}_commission`];
        
        if (!isNaN(odds) && !isNaN(commission)) {
            // Calculate stake for this outcome
            data[`outcome${outcomeIndex}_stake`] = (data.total_stake * (1 / data[`outcome${outcomeIndex}_effective_odds`])) / data.total_value;
            
            // Calculate return for this outcome
            data[`outcome${outcomeIndex}_return`] = data[`outcome${outcomeIndex}_stake`] * odds - (data[`outcome${outcomeIndex}_stake`] * (odds - 1) * commission);
        }
        
        outcomeIndex++;
    }


    // can be any of them - but just doing one as it's guaranteed to be there
    data.profit = (data.outcome1_stake * data.outcome1_effective_odds - data.total_stake);

    return data;

}








