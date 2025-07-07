import wixWindow from 'wix-window';
import { openLightbox } from 'wix-window-frontend';
import { authentication } from 'wix-members-frontend';
import wixWindowFrontend from 'wix-window-frontend';
import wixLocation from 'wix-location';
import wixStorage from 'wix-storage';
import wixData from 'wix-data';
import wixUsers from 'wix-users';


let fromlog = false;

let is_mobile = (wixWindowFrontend.formFactor == "Mobile");

let fractional_input = '#fractional';
let decimal_input = '#decimal';
let moneyline_input = '#moneyline';
let probability_input = '#probability';

if (is_mobile) {
    fractional_input = '#fractionalmobile';
    decimal_input = '#decimalmobile';
    moneyline_input = '#moneylinemobile';
    probability_input = '#probabilitymobile';
}

let BETID;



$w.onReady(function () {

    set_items_and_listeners_on_load();

    async function get_bet_data_standard (BetId) {
        const results = await wixData.query('ProfitTracker')
                .eq('betId', BetId)
                .find();

            if (results.items.length > 0) {
                let row = results.items[0];
                let backstring = row.backodds;
                let parts = backstring.split(',');
                try {
                    $w('#backodds').value = parts[0];
                } catch {}
                try {
                    $w('#lockbackodds').value = parts[1];
                } catch {}
                $w('#layodds').value = row.layodds;
                $w('#backstake').value = row.backstake;
                $w('#laycommission').value = row.commission;
                $w('#bookmaker').value = row.bookie;
                $w('#exchange').value = row.exchange;

                $w('#lockin').checked = row.ispayout;
                if (row.ispayout) {
                    switchify();
                }
                let dateString = row.date;
                const [day, month, year] = dateString.split('/');
                const dateObject = new Date(`${year}-${month}-${day}T00:00:00Z`);
                $w('#date').value = dateObject;

            }

        calculatee();
        
    }

    async function get_discord_data (alertId) {
        const results = await wixData.query('Alerts')
                .eq('alertId', alertId)
                .find();
                if (results.items.length > 0) {
                let row = results.items[0];
                if (row.failed == false) {
                    let al = '2up Alert'
                    $w('#backodds').value = row.backodds;
                    $w('#layodds').value = row.layodds;
                    $w('#backstake').value = '50';
                    $w('#laycommission').value = '0';
                    $w('#bookmaker').value = row.bookie;
                    $w('#desc').value = row.alert;
                    const parsedDate = parseDateString(row._createdDate);
                    const timeSent = formatTimeAgo(parsedDate);
                    $w('#alerttext').text = al + ', Sent ' + timeSent + ' - ' + row.alert;
                    $w('#discordalert').expand();

                }
                }


        update_and_check();

    }


    let queryParameters = wixLocation.query;
    let keys = Object.keys(queryParameters);  // This gets all the keys in the query object.

    // Check if any key includes the word 'alert'
    let alertKey = keys.find(key => key.includes('alert'));  // Find the first key that includes 'alert'

    if (alertKey) {
        get_discord_data(queryParameters[alertKey]);  // Use the value associated with the found key
    }


    let iscalc = wixLocation.query.bet;

    let queryParametersagain = wixLocation.query;
    let keysagain = Object.keys(queryParametersagain);  // This gets all the keys in the query object.

    // Check if any key includes the word 'alert'
    let alertKeyagain = keysagain.find(key => key.includes('alert'));


        if (iscalc) {

            BETID = wixStorage.session.getItem('betId');
            get_bet_data_standard(BETID);
            fromlog = true;
            $w('#logbet').label = 'Update Bet';
            $w('#logbet').collapseIcon();
    
        } else if (!alertKeyagain) {

            const calc = JSON.parse(wixStorage.local.getItem('2up_calculator'))

            if (calc) {

                if (calc.layodds) { $w('#layodds').value = calc.layodds; }
                if (calc.com1) { $w('#laycommission').value = calc.com1; }
                if (calc.paid != null) { $w('#lockin').checked = calc.paid; }
                if (calc.stake) { $w('#backstake').value = calc.stake; }
                if (calc.backodds) { $w('#backodds').value = calc.backodds; }
                if (calc.paid_backodds) { $w('#lockbackodds').value = calc.paid_backodds; }

            }

            
            switchify();

            calculatee();

        }


    $w('#logbet').onClick(async () => { if (authentication.loggedIn()) { logging_bet_function(); } else { openLightbox('log in page'); } });

    calculatee();

    switchify();
  
});







function calculate() {

    var backStake = parseFloat($w("#backstake").value);
    var backOdds = parseFloat($w("#backodds").value);
    var layOdds = parseFloat($w("#layodds").value);
    var layCommission = parseFloat($w("#laycommission").value);

    if (isNaN(backStake) || isNaN(backOdds) || isNaN(layOdds) || isNaN(layCommission)) {
        
        set_stakes_and_profits_to_0();
        return; 
        
    }

    layCommission = layCommission / 100;

    let bookiewin, layStake, layLiability, layWin;
    
    layStake = (backStake * backOdds) / (layOdds - layCommission);
    layLiability = ((backStake * backOdds) / (layOdds - layCommission)) * (layOdds - 1);
    bookiewin = backStake * (backOdds - 1) - (((backStake * backOdds) / (layOdds - layCommission)) * (layOdds - 1));
    layWin = (backStake * (backOdds - 1)) + (layStake * (1 - layCommission));
    

    // set lay win stake
    const lay_win_stake_formatted = layStake !== undefined ? '£' + layStake.toFixed(2) : '£0';
    set_text_value(lay_win_stake_formatted, '#ffffff', true, '#layStake')


    // set profit stake
    let nofta = bookiewin !== undefined ? bookiewin.toFixed(2) : '0';
    if (nofta.includes('-')) {
        nofta = nofta.replace('-', '-£')
    } else {
        nofta = '£' + nofta;
    }
    const textColor = bookiewin > 0 ? '#00ff00' : (bookiewin < 0 ? 'red' : 'white');
    set_text_value(nofta, textColor, false, '#nofta')  


    // set extra place profit
    let fta = layWin !== undefined ? layWin.toFixed(2) : '0';
    if (fta.includes('-')) {
        fta = fta.replace('-', '-£')
    } else {
        fta = '£' + fta;
    }
    const textColorFTA = layWin > 0 ? '#00ff00' : (layWin < 0 ? 'red' : 'white');
    set_text_value(fta, textColorFTA, false, '#fta')  

}





async function logging_bet_function() {

    if ($w('#lockin').checked == true && $w('#lockbackodds').value != '' && $w('#lockbackodds').value != null) {

        const bookie = $w('#bookmaker').value;
        const exchange = $w('#exchange').value;
        const description = $w('#desc').value;
        const complete = false;

        let pprofit = parseFloat($w('#fta').text.replace('£', ''));
        let qloss = parseFloat($w('#lockprofit').text.replace('£', ''));

        let potentialProfit;
        let qualifyingLoss;

        if (pprofit >= qloss) {
            potentialProfit = pprofit;
            qualifyingLoss = qloss;
        } else {
            potentialProfit = qloss;
            qualifyingLoss = pprofit;
        }

        // Reformatting the values with the currency symbol.
        let formattedQualifyingLoss = formatCurrency(qualifyingLoss);
        let formattedPotentialProfit = formatCurrency(potentialProfit);


        let backodds = $w('#backodds').value;
        let layodds = $w('#layodds').value;
        let backstake = $w('#backstake').value;
        if (backstake == '') {
            backstake = '£0';
        } else {
            backstake = '£' + backstake;
        }
        let comm = $w('#laycommission').value;
        if (comm == '') {
            comm = '0%';
        } else {
            comm = comm + '%';
        }
        let type = '2up Paid Out'
        let newbackodds = $w('#lockbackodds').value;

        let backoddsstring = $w('#backodds').value + ',' + $w('#lockbackodds').value;

        const dateObject = new Date($w('#date').value);
        const date = dateObject.toLocaleDateString('en-GB');

        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 1000);
        
        const userId = wixUsers.currentUser.id;
        let betDatadescription = description !== undefined && description !== "" ? description : `${type}. Back Odds: ${backodds}, Lay Odds: ${layodds}, Back Stake: ${backstake}, Commission: ${comm}, New Odds: ${newbackodds}.`;


        if (fromlog == false) {
            const betID = `bet_${timestamp}_${randomNumber}`;

            const newBet = {
                date: date,
                bookie: bookie,
                exchange: exchange,
                description: betDatadescription,
                actualprofit: '',
                potentialprofit: formattedPotentialProfit,
                qloss: formattedQualifyingLoss,
                complete: complete,
                betId: betID,
                userId: userId,
                iscalc: true,
                calculator: '2up',
                backodds: backoddsstring,
                layodds: $w('#layodds').value,
                backstake: $w('#backstake').value,
                commission: $w('#laycommission').value,
                ispayout: true,
            };

            try {
            await wixData.insert("ProfitTracker", newBet)
            .then(() => {
                        wixLocation.to("/betting-profit-tracker");
                });

            } catch (error) {
            // Handle the error if the bet couldn't be saved
            console.error("Error saving bet:", error);
            }

        } else {

            let betID = BETID;
            const newBet = {
                date: date,
                bookie: bookie,
                exchange: exchange,
                description: betDatadescription,
                actualprofit: '',
                potentialprofit: formattedPotentialProfit,
                qloss: formattedQualifyingLoss,
                complete: complete,
                betId: betID,
                userId: userId,
                iscalc: true,
                calculator: '2up',
                backodds: backoddsstring,
                layodds: $w('#layodds').value,
                backstake: $w('#backstake').value,
                commission: $w('#laycommission').value,
                ispayout: true,
            };

            try {

                const results = await wixData.query('ProfitTracker').eq('betId', BETID).find();
                if (results.items.length > 0) {

                    let rowToUpdate = results.items[0];
                    
                    // Directly update properties on rowToUpdate with those from newBet
                    for (const key in newBet) {
                        if (newBet.hasOwnProperty(key)) {
                            rowToUpdate[key] = newBet[key];
                        }
                    }

                    // Await the update to ensure it completes before moving on
                    await wixData.update('ProfitTracker', rowToUpdate)
                    .then(() => {
                        wixLocation.to("/betting-profit-tracker");
                        });

                } else {
                    console.log("No matching bet found to update.");
                    // Optionally handle case where no matching bet is found
                }
            } catch (error) {
                console.error("Error updating bet:", error);
                // Handle or log error appropriately
            }
        
        }



    // if checked and the back odds is not null or empty string - this is the else
    } else {

        const bookie = $w('#bookmaker').value;
        const exchange = $w('#exchange').value;
        const description = $w('#desc').value;
        const complete = false;
        let pprofit = parseFloat($w('#fta').text.replace('£', ''));
        let qloss = parseFloat($w('#nofta').text.replace('£', ''));

        let potentialProfit;
        let qualifyingLoss;

        if (pprofit >= qloss) {
            potentialProfit = pprofit;
            qualifyingLoss = qloss;
        } else {
            potentialProfit = qloss;
            qualifyingLoss = pprofit;
        }

        let formattedQualifyingLoss = formatCurrency(qualifyingLoss);
        let formattedPotentialProfit = formatCurrency(potentialProfit);
    

        let backodds = $w('#backodds').value;
        let layodds = $w('#layodds').value;
        let backstake = $w('#backstake').value;
        if (backstake == '') {
            backstake = '£0';
        } else {
            backstake = '£' + backstake;
        }
        let comm = $w('#laycommission').value;
        if (comm == '') {
            comm = '0%';
        } else {
            comm = comm + '%';
        }
        let type = '2up Bet'
        let backoddsstring = $w('#backodds').value + ',' + $w('#lockbackodds').value;

        

        const dateObject = new Date($w('#date').value);
        const date = dateObject.toLocaleDateString('en-GB');
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 1000);
        
        const userId = wixUsers.currentUser.id;
        let betDatadescription = description !== undefined && description !== "" ? description : `${type}. Back Odds: ${backodds}, Lay Odds: ${layodds}, Back Stake: ${backstake}, Commission: ${comm}.`;


        if (fromlog == false) {

            const betID = `bet_${timestamp}_${randomNumber}`;

            const newBet = {
                date: date,
                bookie: bookie,
                exchange: exchange,
                description: betDatadescription,
                actualprofit: '',
                potentialprofit: formattedPotentialProfit,
                qloss: formattedQualifyingLoss,
                complete: complete,
                betId: betID,
                userId: userId,
                iscalc: true,
                calculator: '2up',
                backodds: backoddsstring,
                layodds: $w('#layodds').value,
                backstake: $w('#backstake').value,
                commission: $w('#laycommission').value,
                ispayout: false,
            };

            try {
                await wixData.insert("ProfitTracker", newBet)
                .then(() => { wixLocation.to("/betting-profit-tracker"); });
            } catch (error) {
                console.error("Error saving bet:", error);
            }
        
    
        } else {
            let betID = BETID;

            const newBet = {
                date: date,
                bookie: bookie,
                exchange: exchange,
                description: betDatadescription,
                actualprofit: '',
                potentialprofit: formattedPotentialProfit,
                qloss: formattedQualifyingLoss,
                complete: complete,
                betId: betID,
                userId: userId,
                iscalc: true,
                calculator: '2up',
                backodds: backoddsstring,
                layodds: $w('#layodds').value,
                backstake: $w('#backstake').value,
                commission: $w('#laycommission').value,
                ispayout: false,
            };

            try {
                const results = await wixData.query('ProfitTracker').eq('betId', BETID).find();
                if (results.items.length > 0) {
                    let rowToUpdate = results.items[0];
                    
                    for (const key in newBet) {
                        if (newBet.hasOwnProperty(key)) {
                            rowToUpdate[key] = newBet[key];
                        }
                    }

                    // Await the update to ensure it completes before moving on
                    await wixData.update('ProfitTracker', rowToUpdate)
                    .then(() => {
                        wixLocation.to("/betting-profit-tracker");
                        });

                } else {
                    console.log("No matching bet found to update.");
                    // Optionally handle case where no matching bet is found
                }
            } catch (error) {
                console.error("Error updating bet:", error);
                // Handle or log error appropriately
            }
            
        }

    }

}


















































































function calculateBackStakeAfterEarlyPayout(originalBackOdds, layOdds, layStake, layCommission, newBackOdds) {

    const originalBackStake = parseFloat($w('#backstake').value); // Original back stake in pounds
    
    let layLiability = ((originalBackStake * originalBackOdds) / (layOdds - layCommission)) * (layOdds - 1);
    
    let guaranteeprofit;
    let abckstake;
    let requiredBackStake = (layStake + layLiability) / ((newBackOdds -1) + 1);
    if (requiredBackStake) {
    guaranteeprofit = requiredBackStake * (newBackOdds - 1) + ((originalBackOdds - 1) * originalBackStake) - layLiability;
    abckstake = requiredBackStake;
    } else {
        guaranteeprofit = 0;
        abckstake = 0;
    }
    return {
        stake: abckstake,
        profit: guaranteeprofit,
    };
}


function update_and_check() {
    const storedata = {
    
        com1: $w('#laycommission').value,
        layodds: $w('#layodds').value,
        stake: $w('#backstake').value,
        backodds: $w('#backodds').value,
        paid: $w('#lockin').checked,
        paid_backodds: $w('#lockbackodds').value

    }


    const storedatastring = JSON.stringify(storedata);
    wixStorage.local.setItem("2up_calculator", storedatastring);

    calculatee();
}

function calculatee() { calculate(); calc(); }

function calc() {

        let newbackodds = parseFloat($w('#lockbackodds').value);
        var backStake = parseFloat($w("#backstake").value);
        var backOdds = parseFloat($w("#backodds").value);
        var layOdds = parseFloat($w("#layodds").value);
        var layCommission = parseFloat($w("#laycommission").value);
        if ($w('#lockin').checked) {
        if (isNaN(backStake) || isNaN(backOdds) || isNaN(layOdds) || isNaN(layCommission) || isNaN(newbackodds)) {

                set_text_value('£0', '#ffffff', false, '#lockprofit')
                set_text_value('£0', '#ffffff', true, '#lockbackstake')   
                return;
            }
        }

    let obj = calculateBackStakeAfterEarlyPayout(parseFloat($w('#backodds').value.replace('£', '')), parseFloat($w('#layodds').value.replace('£', '')), parseFloat($w('#layStake').text.replace('£', '')), (parseFloat($w('#laycommission').value) / 100), newbackodds);

    const back_stake_formatted = obj.stake !== undefined ? '£' + obj.stake.toFixed(2) : '£0';
    set_text_value(back_stake_formatted, '#ffffff', true, '#lockbackstake')   

    let profit = obj.profit !== undefined ? obj.profit.toFixed(2) : '0';
    if (profit.includes('-')) {
        profit = profit.replace('-', '-£')
    } else {
        profit = '£' + profit;
    }
    const textColor = obj.profit > 0 ? '#00ff00' : (obj.profit < 0 ? 'red' : 'white');
    set_text_value(profit, textColor, false, '#lockprofit')


}


function set_items_and_listeners_on_load() {

    if (is_mobile) {
        $w('#showoddsconverter').onClick(() => {
            let oddsconverter = $w('#oddsconvertermobile');

            if (oddsconverter.collapsed) {
                oddsconverter.expand();
            } else {
                oddsconverter.collapse();
            }

        });
    }
    
    $w(fractional_input).onInput(() => convertOdds(fractional_input));
    $w(decimal_input).onInput(() => convertOdds(decimal_input));
    $w(moneyline_input).onInput(() => convertOdds(moneyline_input));
    $w(probability_input).onInput(() => convertOdds(probability_input));

    $w('#discordalert').collapse();

    $w('#laycommission').value = '0';

    $w('#lockin').onChange(() => {
        switchify();
        update_and_check();
    });

    $w('#refreshbutton').onClick(() => {
        refresh_button_clicked();
    });
    
    let backodds1 = wixLocation.query.backodds;
    let layodds1 = wixLocation.query.layodds;
    let bookie1 = wixLocation.query.bookie;
    let exchange1 = wixLocation.query.exchange;
    if (bookie1) {
        $w('#bookmaker').value = bookie1;
    }    
    if (exchange1) {
        $w('#exchange').value = exchange1;
    }
    if (backodds1){
        $w('#backodds').value = backodds1;
    }
    if (layodds1) {
        $w('#layodds').value = layodds1;
    }
    if (backodds1 && layodds1) {
        $w('#backstake').value = '10';
        $w('#laycommission').value = '0';
        update_and_check();
    }

    $w('#0commission').onClick(() => {
        $w('#laycommission').value = '0'
        update_and_check();
    });
    
    $w('#2commission').onClick(() => {
        $w('#laycommission').value = '2'
        update_and_check();
    });
    
    $w("#backstake").onChange(update_and_check).onInput(update_and_check);
    $w("#backodds").onChange(update_and_check).onInput(update_and_check);
    $w("#layodds").onChange(update_and_check).onInput(update_and_check);
    $w("#laycommission").onChange(update_and_check).onInput(update_and_check);
    $w('#lockbackodds').onChange(update_and_check).onInput(update_and_check);




    let lay_stake_clicked, back_stake_clicked;

    $w('#layStake').onClick(() => {

        if (!lay_stake_clicked) {

            lay_stake_clicked = true;

            var delay = 2000;
            let laystake = $w('#layStake').text;

            wixWindow.copyToClipboard(laystake.replace('£', ''))
            .then(() => {

                set_text_value('Copied!', '#ffffff', false, '#layStake')

                setTimeout(function() {
                    set_text_value(laystake, '#ffffff', true, '#layStake');
                    lay_stake_clicked = false;
                }, delay);
            });
        }

    });

    $w('#lockbackstake').onClick(() => {

        if (!back_stake_clicked) {

            back_stake_clicked = true;

            var delay = 2000;
            let laystake = $w('#lockbackstake').text;

            wixWindow.copyToClipboard(laystake.replace('£', ''))
            .then(() => {

                set_text_value('Copied!', '#ffffff', false, '#lockbackstake')

                setTimeout(function() {
                    set_text_value(laystake, '#ffffff', true, '#lockbackstake');
                    back_stake_clicked = false;
                }, delay);
            });
        }
    });
}



function switchify() {

    if ($w('#lockin').checked) {
        $w('#lockinbox').expand();
    } else {
        $w('#lockinbox').collapse();
    }
}

function refresh_button_clicked() {

    $w('#backodds').value = null;
    $w('#layodds').value = null;
    $w('#backstake').value = null;
    $w('#laycommission').value = '0';
    $w('#lockbackodds').value = null;

    set_stakes_and_profits_to_0();

    $w('#lockin').checked = false;
    switchify();

    $w('#desc').value = null;
    $w('#bookmaker').value = '-';
    $w('#exchange').value = '-';
    $w('#date').value = new Date(Date.now());

    wixStorage.local.removeItem('2up_calculator');
    
    fromlog = false;
    $w('#logbet').label = 'Log Bet';
    $w('#logbet').expandIcon();

    calculate();

}







function set_text_value(text, color, is_stake, item) {

    if (!is_mobile) {

        $w(item).html = `<div style="text-align: center; font-family: Arial, sans-serif; color: ${color}; position: relative; ${is_stake ? 'left: -16px;' : ''}">
            <span style="font-size: 32px; line-height: 32px; position: relative; z-index: 1;"><strong>${text}</strong></span>
            ${is_stake ? '<img src="https://i.ibb.co/k8v1LKV/New-Project-6.png" style="width: 32px; height: 32px; margin-left: 5px; position: absolute; transform: translateY(25%);" alt="icon">' : ''}
        </div>`;
        
    } else {

        $w(item).html = `<div style="text-align: center; font-family: Arial, sans-serif; color: ${color}; position: relative; ${is_stake ? 'left: -9px;' : ''}">
            <span style="font-size: 18px; line-height: 18px; position: relative; z-index: 1;"><strong>${text}</strong></span>
            ${is_stake ? '<img src="https://i.ibb.co/k8v1LKV/New-Project-6.png" style="width: 18px; height: 18px; margin-left: 3px; position: absolute; transform: translateY(25%);" alt="icon">' : ''}
        </div>`;

    }
}


function set_stakes_and_profits_to_0() {
    set_text_value('£0', '#ffffff', false, '#nofta')
    set_text_value('£0', '#ffffff', false, '#fta')
    set_text_value('£0', '#ffffff', false, '#lockprofit')
    set_text_value('£0', '#ffffff', true, '#layStake')    
    set_text_value('£0', '#ffffff', true, '#lockbackstake')   
}














function parseDateString(dateString) {
  return new Date(dateString);
}

// Function to format the time difference
function formatTimeAgo(date) {
  const now = new Date(); // Assuming this will be run on "2024-04-08" for example purposes
  const diff = now - date; // Difference in milliseconds
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}






























































































function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function simplifyFraction(numerator, denominator) {
    const commonDivisor = gcd(numerator, denominator);
    return `${numerator / commonDivisor}/${denominator / commonDivisor}`;
}

function toFraction(decimal) {
    const epsilon = 1e-10;
    let h1 = 1;
    let h2 = 0;
    let k1 = 0;
    let k2 = 1;
    let b = decimal;
    do {
        const a = Math.floor(b);
        const aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * epsilon);

    return simplifyFraction(h1, k1);
}

function convertOdds(inputId) {
    const value = $w(inputId).value;

    // Reset all fields if the input box is empty
    if (!value) {
        $w(fractional_input).value = '';
        $w(decimal_input).value = '';
        $w(moneyline_input).value = '';
        $w(probability_input).value = '';
        return;
    }

    // Fractional to Decimal, Moneyline, and Probability
    if (inputId === fractional_input) {
        const parts = value.split('/');
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] !== '0') {
            const decimalValue = (parts[0] / parts[1] + 1);
            const moneylineValue = decimalValue >= 2 ? `+${Math.round((decimalValue - 1) * 100)}` : `-${Math.round(100 / (decimalValue - 1))}`;
            const probabilityValue = (1 / decimalValue) * 100;

            $w(decimal_input).value = decimalValue.toFixed(2);
            $w(moneyline_input).value = moneylineValue;
            $w(probability_input).value = `${probabilityValue.toFixed(2)}%`;
        }
    }

    // Decimal to Fractional, Moneyline, and Probability
    if (inputId === decimal_input) {
        const decimalInput = parseFloat(value);
        if (!isNaN(decimalInput)) {
            const fractional = (decimalInput - 1);
            const moneylineValue = decimalInput >= 2 ? `+${Math.round((decimalInput - 1) * 100)}` : `-${Math.round(100 / (decimalInput - 1))}`;
            const probabilityValue = (1 / decimalInput) * 100;

            $w(fractional_input).value = (fractional > 1 ? toFraction(fractional.toFixed(10)) : toFraction(fractional.toFixed(10))) || '0';
            $w(moneyline_input).value = moneylineValue;
            $w(probability_input).value = `${probabilityValue.toFixed(2)}%`;
        }
    }

    // Moneyline to Decimal, Fractional, and Probability
    if (inputId === moneyline_input) {
        const moneylineInput = parseInt(value);
        if (!isNaN(moneylineInput)) {
            const decimalValue = moneylineInput >= 100 ? (moneylineInput / 100 + 1) : ((-100 / moneylineInput) + 1);
            const fractional = (decimalValue - 1);
            const probabilityValue = (1 / decimalValue) * 100;

            $w(decimal_input).value = decimalValue.toFixed(2);
            $w(fractional_input).value = (fractional > 1 ? toFraction(fractional.toFixed(10)) : toFraction(fractional.toFixed(10))) || '0';
            $w(probability_input).value = `${probabilityValue.toFixed(2)}%`;
        }
    }

    // Probability to Decimal, Fractional, and Moneyline
    if (inputId === probability_input) {
        const probabilityInput = parseFloat(value);
        if (!isNaN(probabilityInput)) {
            const decimalValue = 100 / probabilityInput;
            const fractional = decimalValue - 1;
            const moneylineValue = decimalValue >= 2 ? `+${Math.round((decimalValue - 1) * 100)}` : `-${Math.round(100 / (decimalValue - 1))}`;

            $w(decimal_input).value = decimalValue.toFixed(2);
            $w(fractional_input).value = (fractional > 1 ? toFraction(fractional.toFixed(10)) : toFraction(fractional.toFixed(10))) || '0';
            $w(moneyline_input).value = moneylineValue;
        }
    }
}


function formatCurrency(value) {

    let formattedValue = value.toFixed(2);
    
    if (value < 0) {
        return '-£' + Math.abs(formattedValue);
    } else {
        return '£' + formattedValue;
    }
}