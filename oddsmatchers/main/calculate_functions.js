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



    }

    if (!data.is_payout) {
        data = process_and_round_numbers(data);
        return data;
    } else {

        // more functionality using new back odds and new back commission
        data.incomplete_new_data = false;

        if (isNaN(data.new_back_odds) || isNaN(data.new_back_commission)) {
            data.incomplete_new_data = true;
        } else {

            if (parseFloat(data.new_back_odds) == 1) {
                data.incomplete_new_data = true;
                data = process_and_round_numbers(data);
                return data;
            }




            data.lay_liability = ((data.back_stake * data.back_odds) / (data.lay_odds - data.lay_commission)) * (data.lay_odds - 1)

            // Calculate new_back_stake to make qualifying_loss = potential_profit
            // This creates a guaranteed profit scenario
            const numerator = data.exchange_profit_if_lay_win + data.back_stake - (data.back_odds - 1) * data.back_stake + data.lay_liability;
            const denominator = (data.new_back_odds - 1) * (1 - data.new_back_commission) + 1;
            data.new_back_stake = numerator / denominator;

            data.qualifying_loss = data.exchange_profit_if_lay_win + data.back_stake - data.new_back_stake;

            data.potential_profit = (data.new_back_stake * (data.new_back_odds - 1)) * (1 - data.new_back_commission) + ((data.back_odds - 1) * data.back_stake) - data.lay_liability;

            

        }



        data = process_and_round_numbers(data);
        return data;

    }
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


export function calculate_bonus(data) {

    data.incomplete_data = false;

    // Calculate rating
    if (!isNaN(data.back_odds) && !isNaN(data.lay_odds)) {
        data.rating = (((data.back_odds / data.lay_odds) * 100).toFixed(2)).toString() + '%'
    } else {
        data.rating = '0%';
    }

    if (isNaN(data.back_stake) || isNaN(data.back_odds) || isNaN(data.lay_odds) || isNaN(data.lay_commission) || isNaN(data.max_bonus) || isNaN(data.bonus_retention)) {
        data.incomplete_data = true;
    } else {

        // Calculate bonus worth
        data.bonus_worth = data.max_bonus * data.bonus_retention;

        if (data.laytype == 'Standard') {

            // Standard lay calculations based on mode and isfree
            if (data.mode == 'Wins') {
                if (!data.isfree) {
                    data.lay_stake = (data.back_stake * (data.back_odds - 1) + data.back_stake + data.bonus_worth) / (data.lay_odds - data.lay_commission);
                } else {
                    data.lay_stake = (data.back_stake * (data.back_odds - 1) + data.bonus_worth) / (data.lay_odds - data.lay_commission);
                }
            } else { // Loses
                if (!data.isfree) {
                    data.lay_stake = (data.back_stake * (data.back_odds - 1) + data.back_stake - data.bonus_worth) / (data.lay_odds - data.lay_commission);
                } else {
                    data.lay_stake = (data.back_stake * (data.back_odds - 1) - data.bonus_worth) / (data.lay_odds - data.lay_commission);
                }
            }

            // Calculate profits
            data.bookmaker_profit_if_back_win = data.back_stake * (data.back_odds - 1);
            data.exchange_profit_if_back_win = -data.lay_stake * (data.lay_odds - 1);

            if (!data.isfree) {
                data.bookmaker_profit_if_lay_win = -data.back_stake;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
            } else {
                data.bookmaker_profit_if_lay_win = 0;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
            }

            // Add bonus based on mode
            if (data.mode == 'Wins') {
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win + data.bonus_worth;
                data.total_profit_if_lay_win = data.bookmaker_profit_if_lay_win + data.exchange_profit_if_lay_win;
            } else { // Loses
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;
                data.total_profit_if_lay_win = data.bookmaker_profit_if_lay_win + data.exchange_profit_if_lay_win + data.bonus_worth;
            }

        } else if (data.laytype == 'Underlay') {

            // Underlay calculation: solve for lay stake that makes the worse outcome = 0
            // This minimizes the potential loss
            
            if (data.mode == 'Wins') {
                // Bonus applies when back bet wins
                if (!data.isfree) {
                    // Solve for: total_profit_if_lay_win = 0
                    // Formula: bookmaker_profit_if_lay_win + exchange_profit_if_lay_win = 0
                    // -back_stake + lay_stake * (1 - lay_commission) = 0
                    data.lay_stake = data.back_stake / (1 - data.lay_commission);
                } else {
                    // For free bets underlay, solve for: total_profit_if_back_win - total_profit_if_lay_win = lay_odds - 1
                    // total_profit_if_back_win = back_stake * (back_odds - 1) - lay_stake * (lay_odds - 1) + bonus_worth
                    // total_profit_if_lay_win = lay_stake * (1 - lay_commission)
                    // Constraint: back_stake * (back_odds - 1) - lay_stake * (lay_odds - 1) + bonus_worth = lay_stake * (1 - lay_commission) + (lay_odds - 1)
                    // Rearranging: back_stake * (back_odds - 1) + bonus_worth - (lay_odds - 1) = lay_stake * (lay_odds - lay_commission)
                    data.lay_stake = (data.back_stake * (data.back_odds - 1) + data.bonus_worth - (data.lay_odds - 1)) / (data.lay_odds - data.lay_commission);
                }
            } else { // Loses
                // Bonus applies when lay bet wins  
                if (!data.isfree) {
                    // Solve for: total_profit_if_lay_win = 0
                    // Formula: bookmaker_profit_if_lay_win + exchange_profit_if_lay_win + bonus_worth = 0
                    // -back_stake + lay_stake * (1 - lay_commission) + bonus_worth = 0
                    // lay_stake * (1 - lay_commission) = back_stake - bonus_worth
                    data.lay_stake = (data.back_stake - data.bonus_worth) / (1 - data.lay_commission);
                } else {
                    // For free bets, solve for: total_profit_if_lay_win = back_stake
                    // Formula: bookmaker_profit_if_lay_win + exchange_profit_if_lay_win + bonus_worth = back_stake
                    // 0 + lay_stake * (1 - lay_commission) + bonus_worth = back_stake
                    // lay_stake * (1 - lay_commission) = back_stake - bonus_worth
                    data.lay_stake = (data.back_stake - data.bonus_worth) / (1 - data.lay_commission);
                }
            }

            // Calculate profits with underlay lay stake
            data.bookmaker_profit_if_back_win = data.back_stake * (data.back_odds - 1);
            data.exchange_profit_if_back_win = -data.lay_stake * (data.lay_odds - 1);

            if (!data.isfree) {
                data.bookmaker_profit_if_lay_win = -data.back_stake;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
            } else {
                data.bookmaker_profit_if_lay_win = 0;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
            }

            // Add bonus based on mode
            if (data.mode == 'Wins') {
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win + data.bonus_worth;
                data.total_profit_if_lay_win = data.bookmaker_profit_if_lay_win + data.exchange_profit_if_lay_win;
            } else { // Loses
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;
                data.total_profit_if_lay_win = data.bookmaker_profit_if_lay_win + data.exchange_profit_if_lay_win + data.bonus_worth;
            }

        } else if (data.laytype == 'Overlay') {

            // Overlay calculation: solve for lay stake that maximizes minimum profit
            if (data.mode == 'Wins') {
                // Bonus applies when back bet wins
                // Solve for: total_profit_if_back_win = 0 (minimize the worse outcome)
                // Formula: back_stake * (back_odds - 1) - lay_stake * (lay_odds - 1) + bonus_worth = 0
                if (!data.isfree) {
                    // back_stake * (back_odds - 1) - lay_stake * (lay_odds - 1) + bonus_worth = 0
                    // lay_stake * (lay_odds - 1) = back_stake * (back_odds - 1) + bonus_worth
                    data.lay_stake = (data.back_stake * (data.back_odds - 1) + data.bonus_worth) / (data.lay_odds - 1);
                } else {
                    // For free bets overlay, solve for total_profit_if_lay_win = back_stake
                    data.lay_stake = data.back_stake / (1 - data.lay_commission);
                }
            } else { // Loses
                // Bonus applies when lay bet wins
                // Use standard overlay formula but optimize for maximum profit
                if (!data.isfree) {
                    data.lay_stake = (data.back_stake * (data.back_odds - 1)) / (data.lay_odds - 1);
                } else {
                    data.lay_stake = (data.back_stake * (data.back_odds - 1)) / (data.lay_odds - 1);
                }
            }

            // Calculate profits with overlay lay stake
            data.bookmaker_profit_if_back_win = data.back_stake * (data.back_odds - 1);
            data.exchange_profit_if_back_win = -data.lay_stake * (data.lay_odds - 1);

            if (!data.isfree) {
                data.bookmaker_profit_if_lay_win = -data.back_stake;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
            } else {
                data.bookmaker_profit_if_lay_win = 0;
                data.exchange_profit_if_lay_win = data.lay_stake * (1 - data.lay_commission);
            }

            // Add bonus based on mode
            if (data.mode == 'Wins') {
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win + data.bonus_worth;
                data.total_profit_if_lay_win = data.bookmaker_profit_if_lay_win + data.exchange_profit_if_lay_win;
            } else { // Loses
                data.total_profit_if_back_win = data.bookmaker_profit_if_back_win + data.exchange_profit_if_back_win;
                data.total_profit_if_lay_win = data.bookmaker_profit_if_lay_win + data.exchange_profit_if_lay_win + data.bonus_worth;
            }
        }

        // Calculate qualifying loss and potential profit
        data.qualifying_loss = data.total_profit_if_back_win;
        if (data.total_profit_if_back_win > data.total_profit_if_lay_win) {
            data.qualifying_loss = data.total_profit_if_lay_win;
        }

        data.potential_profit = Math.max(data.total_profit_if_back_win, data.total_profit_if_lay_win);
    }

    data = process_and_round_numbers(data);
    return data;
}





export function calculate_each_way_and_extra_place(data, is_extra_place) {

    data.incomplete_data = false;

    if (!isNaN(data.each_way_odds) && !isNaN(data.exchange_win_odds) && !isNaN(data.exchange_place_odds) && data.bookmaker_fraction != '1/') {
        
        data.back_place_odds = get_back_implied_place_odds(data.bookmaker_fraction, data.each_way_odds)
        data.rating = (((data.each_way_odds + data.back_place_odds) / (data.exchange_win_odds + data.exchange_place_odds)) * 100).toFixed(2) + '%';

    } else {
        data.rating = '0%';
        data.incomplete_data = true;
        return data;
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




export function calculate_sequential_lay(data) {


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
    while (data[`leg${outcomeIndex}_odds`] !== undefined) {
        const odds = data[`leg${outcomeIndex}_odds`];
        if (!isNaN(odds)) {
            oddsValues.push(odds);
        }
        outcomeIndex++;
    }

    // Reset outcomeIndex for commission collection
    outcomeIndex = 1;
    
    // Collect all commission values using numbered keys
    while (data[`leg${outcomeIndex}_commission`] !== undefined) {
        const commission = data[`leg${outcomeIndex}_commission`];
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
    
    // then check commisssions and return if missing any 
    if ((commissionValues.length != data.outcomes) || !data.back_stake || !data.back_odds) {
        data.incomplete_data = true;
        return data;
    }
    

    if (data.method == 'Standard Bet') {

        data = calculate_sequential_lay_standard(data);
        
    } else if (data.method == 'Standard Free') {

        data = calculate_sequential_lay_standard_free(data);

    } else if (data.method == 'Underlay') {
        
        data = calculate_sequential_lay_underlay(data);

    } else if (data.method == 'Underlay Lock In') {

        data = calculate_sequential_lay_underlay_lock_in(data);

    }

    
    // loop over all values in data and if number then round to fixed (2)
    data = process_and_round_numbers(data);

    return data;

}


function calculate_sequential_lay_standard(data) {

    // Calculate stakes starting from the last leg and working backwards
    const stakes = [];
    const liabilities = [];
    const profits = [];
    
    // Ensure outcomes is an integer
    const outcomes = parseInt(data.outcomes);
    
    // Calculate stakes from last leg to first leg
    for (let i = outcomes; i >= 1; i--) {
        const odds = data[`leg${i}_odds`];
        const commission = data[`leg${i}_commission`];
        
        if (i === outcomes) {
            // Last leg: stake = (back_stake * back_odds) / (odds - commission)
            stakes[i-1] = (data.back_stake * data.back_odds) / (odds - commission);
        } else {
            // Previous legs: stake = (next_stake * (1 - next_commission)) / (odds - commission)
            stakes[i-1] = (stakes[i] * (1 - data[`leg${i+1}_commission`])) / (odds - commission);
        }
        
        // Calculate liability for this leg
        liabilities[i-1] = stakes[i-1] * (odds - 1);
        
        // Store stake in data object
        data[`leg${i}_stake`] = stakes[i-1];
        data[`leg${i}_liability`] = liabilities[i-1];
    }
    
    // Calculate total liability
    const totalLiability = liabilities.reduce((sum, liability) => sum + liability, 0);
    
    // Calculate end profit (if all legs win)
    data.profit_all_legs_win = (data.back_stake * (data.back_odds - 1)) - totalLiability;
    
    // Calculate profit for each leg if it loses
    for (let i = 1; i <= outcomes; i++) {
        const stake = stakes[i-1];
        const commission = data[`leg${i}_commission`];
        
        // Calculate accumulated liability from previous legs
        let accumulatedLiability = 0;
        for (let j = 0; j < i-1; j++) {
            accumulatedLiability += liabilities[j];
        }
        
        // Profit if this leg loses = stake * (1 - commission) - back_stake - accumulated_liability
        profits[i-1] = (stake * (1 - commission)) - data.back_stake - accumulatedLiability;
        
        // Store profit in data object
        data[`leg${i}_profit`] = profits[i-1];
    }
    
    // Set qualifying loss and potential profit
    data.qualifying_loss = data.profit_all_legs_win;
    data.potential_profit = data.profit_all_legs_win;


    return data;

}

function calculate_sequential_lay_standard_free(data) {

    // Calculate stakes starting from the last leg and working backwards
    const stakes = [];
    const liabilities = [];
    const profits = [];
    
    // Ensure outcomes is an integer
    const outcomes = parseInt(data.outcomes);
    
    // Calculate stakes from last leg to first leg
    for (let i = outcomes; i >= 1; i--) {
        const odds = data[`leg${i}_odds`];
        const commission = data[`leg${i}_commission`];
        
        if (i === outcomes) {
            // Last leg: stake = (back_stake * (back_odds - 1)) / (odds - commission)
            stakes[i-1] = (data.back_stake * (data.back_odds - 1)) / (odds - commission);
        } else {
            // Previous legs: stake = (next_stake * (1 - next_commission)) / (odds - commission)
            stakes[i-1] = (stakes[i] * (1 - data[`leg${i+1}_commission`])) / (odds - commission);
        }
        
        // Calculate liability for this leg
        liabilities[i-1] = stakes[i-1] * (odds - 1);
        
        // Store stake in data object
        data[`leg${i}_stake`] = stakes[i-1];
        data[`leg${i}_liability`] = liabilities[i-1];
    }
    
    // Calculate total liability
    const totalLiability = liabilities.reduce((sum, liability) => sum + liability, 0);
    
    // Calculate end profit (if all legs win)
    data.profit_all_legs_win = (data.back_stake * (data.back_odds - 1)) - totalLiability;
    
    // Calculate profit for each leg if it loses
    for (let i = 1; i <= outcomes; i++) {
        const stake = stakes[i-1];
        const commission = data[`leg${i}_commission`];
        
        // Calculate accumulated liability from previous legs
        let accumulatedLiability = 0;
        for (let j = 0; j < i-1; j++) {
            accumulatedLiability += liabilities[j];
        }
        
        // Profit if this leg loses = stake * (1 - commission) - accumulated_liability (no back_stake deduction)
        profits[i-1] = (stake * (1 - commission)) - accumulatedLiability;
        
        // Store profit in data object
        data[`leg${i}_profit`] = profits[i-1];
    }
    
    // Set qualifying loss and potential profit
    data.qualifying_loss = data.profit_all_legs_win;
    data.potential_profit = data.profit_all_legs_win;

    return data;

}


function calculate_sequential_lay_underlay(data) {

    // Calculate stakes starting from the first leg and working forwards
    const stakes = [];
    const liabilities = [];
    
    // Ensure outcomes is an integer
    const outcomes = parseInt(data.outcomes);
    
    // Calculate stakes from first leg to last leg
    for (let i = 1; i <= outcomes; i++) {
        const odds = data[`leg${i}_odds`];
        const commission = data[`leg${i}_commission`];
        
        if (i === 1) {
            // First leg: stake = back_stake / (1 - commission)
            stakes[i-1] = data.back_stake / (1 - commission);
        } else {
            // Calculate sum of all previous liabilities
            let sumOfPreviousLiabilities = 0;
            for (let j = 0; j < i-1; j++) {
                sumOfPreviousLiabilities += liabilities[j];
            }
            
            // Subsequent legs: stake = (sum_of_previous_liabilities + back_stake) / (1 - commission)
            stakes[i-1] = (sumOfPreviousLiabilities + data.back_stake) / (1 - commission);
        }
        
        // Calculate liability for this leg
        liabilities[i-1] = stakes[i-1] * (odds - 1);
        
        // Store stake in data object
        data[`leg${i}_stake`] = stakes[i-1];
        data[`leg${i}_liability`] = liabilities[i-1];
    }
    
    // Calculate total liability
    const totalLiability = liabilities.reduce((sum, liability) => sum + liability, 0);
    
    // Calculate end profit (if all legs win)
    data.profit_all_legs_win = (data.back_stake * (data.back_odds - 1)) - totalLiability;
    
    // For underlay, all individual leg profits are 0 (as shown in the provided code)
    for (let i = 1; i <= outcomes; i++) {
        data[`leg${i}_profit`] = 0;
    }
    
    // Set qualifying loss and potential profit
    data.qualifying_loss = data.leg1_profit;
    data.potential_profit = data.profit_all_legs_win;

    return data;

}


function calculate_sequential_lay_underlay_lock_in(data) {

    // Calculate stakes starting from the first leg and working forwards
    const stakes = [];
    const liabilities = [];
    
    // Ensure outcomes is an integer
    const outcomes = parseInt(data.outcomes);
    
    // Calculate stakes from first leg to last leg
    for (let i = 1; i <= outcomes; i++) {
        const odds = data[`leg${i}_odds`];
        const commission = data[`leg${i}_commission`];
        
        if (i === 1) {
            // First leg: stake = back_stake / (1 - commission)
            stakes[i-1] = data.back_stake / (1 - commission);
        } else if (i === outcomes) {
            // Last leg: stake = (back_stake * back_odds) / (odds - commission)
            stakes[i-1] = (data.back_stake * data.back_odds) / (odds - commission);
        } else {
            // Middle legs: stake = (sum_of_previous_liabilities + back_stake) / (1 - commission)
            let sumOfPreviousLiabilities = 0;
            for (let j = 0; j < i-1; j++) {
                sumOfPreviousLiabilities += liabilities[j];
            }
            stakes[i-1] = (sumOfPreviousLiabilities + data.back_stake) / (1 - commission);
        }
        
        // Calculate liability for this leg
        liabilities[i-1] = stakes[i-1] * (odds - 1);
        
        // Store stake in data object
        data[`leg${i}_stake`] = stakes[i-1];
        data[`leg${i}_liability`] = liabilities[i-1];
    }
    
    // Calculate total liability
    const totalLiability = liabilities.reduce((sum, liability) => sum + liability, 0);
    
    // Calculate end profit (if all legs win)
    data.profit_all_legs_win = (data.back_stake * (data.back_odds - 1)) - totalLiability;
    
    // Calculate profit for each leg if it loses
    for (let i = 1; i <= outcomes; i++) {
        if (i === outcomes) {
            // Last leg: calculate profit if it loses
            const stake = stakes[i-1];
            const commission = data[`leg${i}_commission`];
            
            // Calculate accumulated liability from all previous legs
            let accumulatedLiability = 0;
            for (let j = 0; j < i-1; j++) {
                accumulatedLiability += liabilities[j];
            }
            
            // Profit if last leg loses = stake * (1 - commission) - accumulated_liability - back_stake
            data[`leg${i}_profit`] = (stake * (1 - commission)) - accumulatedLiability - data.back_stake;
        } else {
            // All other legs: profit is 0
            data[`leg${i}_profit`] = 0;
        }
    }
    
    // Set qualifying loss and potential profit
    data.qualifying_loss = data.profit_all_legs_win;
    data.potential_profit = data.profit_all_legs_win;

    return data;

}


