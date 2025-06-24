


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


export function calculate_each_way(data) {

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





        // SOME VARIABLES FOR THE EXPLANATION TEXT 
        data.total_bookmaker_gain_if_win_and_place = (data.bookmaker_profit_win_wins + data.bookmaker_profit_place_place);

        data.total_bookmaker_gain_if_not_win_but_places = (- data.each_way_stake + data.bookmaker_profit_place_place);

        data.total_bookmaker_loss_if_not_win_or_place = (- data.each_way_stake * 2);



        // loop over all values in data and if number then round to fixed (2)
        data = process_and_round_numbers(data);

    }
    
    return data;


}







/* 

import { lightbox } from 'wix-window-frontend';
import { bookmakerImages, exchangeImages } from 'public/custom-elements/betterbet.js';
import wixData from 'wix-data';
import wixUsers from 'wix-users';
import { openLightbox } from 'wix-window-frontend';
import { authentication } from 'wix-members-frontend';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';


const userId = wixUsers.currentUser.id;


$w.onReady(function () {

  	let data = lightbox.getContext();

    set_values(data);

    const outcome_text_object = get_first_second_text(data);

    $w('#firstoutcome').html = `<h2 class="font_7 wixui-rich-text__text" style="position: absolute; font-size:14px; line-height:normal;"><span style="font-size:14px;" class="wixui-rich-text__text"><span style="color:#FFFFFF;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">${outcome_text_object.first_text}</span></span></span></span></h2>`
    $w('#secondoutcome').html = `<h2 class="font_7 wixui-rich-text__text" style="position: absolute; font-size:14px; line-height:normal;"><span style="font-size:14px;" class="wixui-rich-text__text"><span style="color:#FFFFFF;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">${outcome_text_object.second_text}</span></span></span></span></h2>`
    $w('#thirdoutcome').html = `<h2 class="font_7 wixui-rich-text__text" style="position: absolute; font-size:14px; line-height:normal;"><span style="font-size:14px;" class="wixui-rich-text__text"><span style="color:#FFFFFF;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">${outcome_text_object.third_text}</span></span></span></span></h2>`
    $w('#fourthoutcome').html = `<h2 class="font_7 wixui-rich-text__text" style="position: absolute; font-size:14px; line-height:normal;"><span style="font-size:14px;" class="wixui-rich-text__text"><span style="color:#FFFFFF;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">${outcome_text_object.fourth_text}</span></span></span></span></h2>`


    // reached this point

    calculate_and_diplay_values(data);

    $w('TextInput').onInput((event) => {
      calculate_and_diplay_values(data);
    })
    $w('TextInput').onChange((event) => {
      calculate_and_diplay_values(data);
    })

    


    $w('#logbet').onClick(() => {

      if (authentication.loggedIn) {

        add_to_profit_tracker(data)

      } else {
        openLightbox('log in page');
      }

    });




});













function get_first_second_text(data) {

  let abbrev = 'nd';
  if (data.bookmaker_places == 3) {
    abbrev = 'rd';
  } else if (data.bookmaker_places >= 4) {
    abbrev = 'th';
  }

  return {
    first_text: 'If ' + data.horse + ' Wins the Race',
    second_text: 'If ' + data.horse + ' Finishes Top ' + data.exchange_places,
    third_text: 'If ' + data.horse + ' Finishes ' + data.bookmaker_places + abbrev,
    fourth_text: 'If ' + data.horse + ' Doesn\'t Finish Top ' + data.bookmaker_places,
  }

}







function get_html(data, values) {

  let win_outcome = data.horse + ' To Win';
  let place_outcome = data.horse + ' To Finish Top ' + data.exchange_places;


  let style_for_stake = 'style="border-bottom: 2px dotted #EBEBEB; padding-bottom: 1px; cursor:pointer;"';

  return {
    fixture: '<h2 class="font_7 wixui-rich-text__text" style="font-size:20px; line-height:normal; text-align:center;"><span style="font-size:20px;" class="wixui-rich-text__text"><span style="color:#FFFFFF;" class="wixui-rich-text__text"><span style="font-weight:bold;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">',
    dateandtime: '<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="color:#FFFFFF;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">',
    back_bet: `<div style="text-align: center; font-family: Arial, sans-serif; color: #EBEBEB; position: relative;">
                  <span style="font-size: 16px; line-height: 20px;">
                      <strong>Back</strong>&nbsp;${data.horse} @ 
                      <strong>${values.back_odds}</strong> with a 
                      <span ${style_for_stake}>&pound;${values.back_stake} Each Way Stake</span>
                  </span>
                  <img src="https://i.ibb.co/k8v1LKV/New-Project-6.png" style="width: 20px; height: 20px; margin-left: 5px; position: absolute; transform: translateY(25%);" alt="icon">
              </div>`,

    lay_bet: `<div style="text-align: center; font-family: Arial, sans-serif; color: #EBEBEB; position: relative;">
                  <span style="font-size: 16px; line-height: 20px;">
                      <strong>Lay</strong>&nbsp;${win_outcome} @ 
                      <strong>${values.lay_odds}</strong> with a 
                      <span ${style_for_stake}>&pound;${values.lay_stake} Stake</span>
                  </span>
                  <img src="https://i.ibb.co/k8v1LKV/New-Project-6.png" style="width: 20px; height: 20px; margin-left: 5px; position: absolute; transform: translateY(25%);" alt="icon">
              </div>`,

        place_lay_bet: `<div style="text-align: center; font-family: Arial, sans-serif; color: #EBEBEB; position: relative;">
                  <span style="font-size: 16px; line-height: 20px;">
                      <strong>Lay</strong>&nbsp;${place_outcome} @ 
                      <strong>${values.place_lay_odds}</strong> with a 
                      <span ${style_for_stake}>&pound;${values.place_lay_stake} Stake</span>
                  </span>
                  <img src="https://i.ibb.co/k8v1LKV/New-Project-6.png" style="width: 20px; height: 20px; margin-left: 5px; position: absolute; transform: translateY(25%);" alt="icon">
              </div>`
  }

}






function formatDate(dateStr) {
    // Parse the date string
    const [datePart, timePart] = dateStr.split(' @ ');
    const [day, month, year] = datePart.split('/').map(num => parseInt(num, 10));

    // Adjust the year to include the full year format (assumes 2000s)
    const fullYear = 2000 + year;

    // Create a Date object
    const date = new Date(fullYear, month - 1, day, 0, 0);

    // Format the date
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Return the formatted date along with the time
    return `${formattedDate} @ ${timePart}`;
}


function get_sport_icon_url(sport) {

  if (sport == 'Football') {
    return 'https://static.wixstatic.com/media/7a0e3a_09ecb2d288cd4c5fbbc01553c794ecf9~mv2.png';
  } else if (sport == 'Horse Racing') {
    return 'https://static.wixstatic.com/media/7a0e3a_7571a1fffe194bff8940e878f375f52b~mv2.png';
  } else {
    console.log('dont recognise sport');
    return '';
  }

}


function get_bookmaker_image(bookmaker) {
    if (bookmakerImages[bookmaker]) {
        return bookmakerImages[bookmaker];
    } else {
        console.log("No image found for bookmaker:", bookmaker);
        return null; // Or a default URL if you prefer
    }
}

function get_exchange_image(exchange) {
    if (exchangeImages[exchange]) {
        return exchangeImages[exchange];
    } else {
        console.log("No image found for exchange:", exchange);
        return null; // Or a default URL if you prefer
    }
}



function set_values(data) {

    $w('#bookmakerimage').link = data.bookmaker_link;
    $w('#exchangeimage').link = data.win_exchange_link;
    $w('#placeexchangeimage').link = data.place_exchange_link;
    $w('#bookmakerimage').src = get_bookmaker_image(data.bookmaker);
    $w('#exchangeimage').src = get_exchange_image(data.win_exchange);
    $w('#placeexchangeimage').src = get_exchange_image(data.place_exchange);
    $w('#bookmakerbutton').link = data.bookmaker_link;
    $w('#exchangebutton').link = data.win_exchange_link;
    $w('#placeexchangebutton').link = data.place_exchange_link;
    $w('#bookmakerbutton').label = 'Go to ' + data.bookmaker;
    $w('#exchangebutton').label = 'Go to ' + data.win_exchange;  
    $w('#placeexchangebutton').label = 'Go to ' + data.place_exchange;  
    $w('#sporticon').src = get_sport_icon_url(data.sport);

    $w('#backstake').value = '10';
    $w('#backodds').value = data.bookmaker_each_way_odds;
    $w('#backcomm').value = '0';
    
    $w('#layodds').value = data.exchange_win_odds;
    $w('#laycomm').value = '0';
  
    $w('#placelayodds').value = data.exchange_place_odds;
    $w('#placelaycomm').value = '0';

}

function get_outcome_and_fixture(data) {

  return {
    fixture: data.fixture + ' - ' + data.horse_race_distance + ', ' + data.horse_race_runners + ' Runners',
    epinf: 'Bookmaker Places: ' + data.bookmaker_places + ', Exchange Places: ' + data.exchange_places + ', Extra Places: ' + data.extra_places,
    outcome: data.outcome + ' To Go 2 Goals Ahead and Not Win'
  }

}

function get_back_implied_place_odds(bookmaker_fraction, each_way_odds) {
      let bookmakerFraction = bookmaker_fraction.split('/');
      let numerator = parseInt(bookmakerFraction[0], 10);
      let denominator = parseInt(bookmakerFraction[1], 10);
      bookmakerFraction = numerator / denominator;
      return (((each_way_odds - 1) * bookmakerFraction) + 1)
}

function calculate_and_diplay_values(data) {

  let back_stake = parseFloat($w('#backstake').value)
  let back_odds = parseFloat($w('#backodds').value);
  let back_comm = parseFloat($w('#backcomm').value) / 100;

  let lay_odds = parseFloat($w('#layodds').value);
  let lay_comm = parseFloat($w('#laycomm').value) / 100;

  let place_lay_odds = parseFloat($w('#placelayodds').value);
  let place_lay_comm = parseFloat($w('#placelaycomm').value) / 100;


  let lay_stake, place_lay_stake, bookmakerfirst, bookmakersecond, exchangefirst, exchangesecond, totalfirst, totalsecond, bookmakerthird, exchangethird, totalthird, bookmakerfourth, exchangefourth, totalfourth;

  let bookmakerfirst_place, exchangefirst_place, bookmakersecond_place, exchangesecond_place, bookmakerthird_place, exchangethird_place, bookmakerfourth_place, exchangefourth_place;



  if (isNaN(back_stake) || isNaN(back_odds) || isNaN(back_comm) || isNaN(lay_odds) || isNaN(lay_comm) || isNaN(place_lay_odds) || isNaN(place_lay_comm)) {

    set_all_values_to_0(data);

  } else {

      let back_place_odds = get_back_implied_place_odds(data.bookmaker_fraction, back_odds)

      bookmakerfirst = ((back_stake * back_odds) - back_stake) * (1 - back_comm);   
      lay_stake = ((bookmakerfirst + back_stake)/(lay_odds-lay_comm));
      exchangefirst = - lay_stake * (lay_odds - 1);

      bookmakerfirst_place = ((back_stake * back_place_odds) - back_stake) * (1 - back_comm);    
      place_lay_stake = ((bookmakerfirst_place + back_stake)/(place_lay_odds-place_lay_comm));
      exchangefirst_place = - place_lay_stake * (place_lay_odds - 1);

      totalfirst = bookmakerfirst + exchangefirst + bookmakerfirst_place + exchangefirst_place;


      bookmakersecond = - back_stake;
      exchangesecond = lay_stake * (1 - lay_comm);

      bookmakersecond_place = bookmakerfirst_place;
      exchangesecond_place = exchangefirst_place;

      totalsecond = exchangesecond + bookmakersecond + bookmakersecond_place + exchangesecond_place;

      

      bookmakerthird = bookmakersecond;
      exchangethird = exchangesecond;

      bookmakerthird_place = bookmakerfirst_place;
      exchangethird_place = place_lay_stake * (1 - place_lay_comm);


      totalthird = bookmakerthird + exchangethird + bookmakerthird_place + exchangethird_place;




    
      bookmakerfourth = bookmakersecond;
      exchangefourth = exchangesecond;

      bookmakerfourth_place = bookmakerthird;
      exchangefourth_place = place_lay_stake * (1 - place_lay_comm);


      totalfourth = bookmakerfourth + exchangefourth + bookmakerfourth_place + exchangefourth_place;




      let qualifying_loss = totalfirst;
      if (totalsecond < totalfirst) {
        qualifying_loss = totalsecond
      }
      if (totalfourth < totalsecond) {
        qualifying_loss = totalfourth
      }

      let potential_profit = totalthird;


      let implied_odds;
      let combined_profit = parseFloat(qualifying_loss.toString().replace('-', '')) + parseFloat(potential_profit.toString().replace('-', ''))
      if (qualifying_loss >= 0) {
        implied_odds = '1000';
      } else {
        implied_odds = (combined_profit / parseFloat(qualifying_loss.toString().replace('-', ''))).toFixed(2);
      } 
      $w('#rating').text = implied_odds


  const values_obj = {
    back_odds: back_odds,
    lay_odds: lay_odds,
    place_lay_odds: place_lay_odds,
    back_stake: back_stake, 
    lay_stake: lay_stake.toFixed(2),
    place_lay_stake: place_lay_stake.toFixed(2),
    bookmakerfirst: bookmakerfirst.toFixed(2),
    bookmakerfirst_place: bookmakerfirst_place.toFixed(2),
    bookmakersecond: bookmakersecond.toFixed(2),
    bookmakersecond_place: bookmakersecond_place.toFixed(2),
    exchangefirst: exchangefirst.toFixed(2),
    exchangefirst_place: exchangefirst_place.toFixed(2),
    exchangesecond: exchangesecond.toFixed(2),
    exchangesecond_place: exchangesecond_place.toFixed(2),
    totalfirst: totalfirst.toFixed(2),
    totalsecond: totalsecond.toFixed(2),
    qualifying_loss: qualifying_loss.toFixed(2),
    potential_profit: potential_profit.toFixed(2),
    bookmakerthird: bookmakerthird.toFixed(2),
    bookmakerthird_place: bookmakerthird_place.toFixed(2),
    exchangethird: exchangethird.toFixed(2),
    exchangethird_place: exchangethird_place.toFixed(2),
    totalthird: totalthird.toFixed(2),
    bookmakerfourth: bookmakerfourth.toFixed(2),
    bookmakerfourth_place: bookmakerfourth_place.toFixed(2),
    exchangefourth: exchangefourth.toFixed(2),
    exchangefourth_place: exchangefourth_place.toFixed(2),
    totalfourth: totalfourth.toFixed(2),

  }

  display_table_values(values_obj)
  set_profit_qualifying_loss_text(values_obj.qualifying_loss, values_obj.potential_profit);
  set_lay_stake_and_text(data, values_obj);

  }


}

function display_table_values(obj) {



  function set_specific_value_html(value, id, extravalue) {

    if (extravalue) {

      let color = '#ffffff'
      if (value.toString().includes('-')) {
        color = '#f91f1f';
        value = value.toString().replace('-', '-£');
      } else if (value != '0.00') {
        color = '#00ff00';
        value = '+£' + value.toString();
      } else {
        value = '£0';
      }

      let extracolor = '#ffffff'
      if (extravalue.toString().includes('-')) {
        extracolor = '#f91f1f';
        extravalue = extravalue.toString().replace('-', '-£');
      } else if (extravalue != '0.00') {
        extracolor = '#00ff00';
        extravalue = '+£' + extravalue.toString();
      } else {
        extravalue = '£0';
      }



      $w(id).html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:14px; line-height:1.4em; text-align:center;"><span style="font-size:14px;" class="wixui-rich-text__text"><span style="color:${color};" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">${value}</span></span></span></span></h2>`;
      $w(id).html += `<h2 class="font_7 wixui-rich-text__text" style="font-size:14px; line-height:1.4em; text-align:center;"><span style="font-size:14px;" class="wixui-rich-text__text"><span style="color:${extracolor};" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text"> ${extravalue}</span></span></span></span></h2>`;



    } else {




      let color = '#ffffff'
      if (value.toString().includes('-')) {
        color = '#f91f1f';
        value = value.toString().replace('-', '-£');
      } else if (value != '0.00') {
        color = '#00ff00';
        value = '+£' + value.toString();
      } else {
        value = '£0';
      }
      $w(id).html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:14px; line-height:normal; text-align:center;"><span style="font-size:14px;" class="wixui-rich-text__text"><span style="color:${color};" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">${value}</span></span></span></span></h2>`;
    
    }
  }

  const id_values = ['#bookmakerfirst', '#bookmakersecond', '#bookmakerthird', '#bookmakerfourth', '#exchangefirst', '#exchangesecond', '#exchangethird', '#exchangefourth', '#totalfirst', '#totalsecond', '#totalthird', '#totalfourth'];
  const table_values = [obj.bookmakerfirst, obj.bookmakersecond, obj.bookmakerthird, obj.bookmakerfourth, obj.exchangefirst, obj.exchangesecond, obj.exchangethird, obj.exchangefourth, obj.totalfirst, obj.totalsecond, obj.totalthird, obj.totalfourth];

  const extravalues = [obj.bookmakerfirst_place, obj.bookmakersecond_place, obj.bookmakerthird_place, obj.bookmakerfourth_place, obj.exchangefirst_place, obj.exchangesecond_place, obj.exchangethird_place, obj.exchangefourth_place];

    for (let i = 0; i < 12; i++) {
      if (i < 9) {
        set_specific_value_html(table_values[i], id_values[i], extravalues[i]);
      } else {
        set_specific_value_html(table_values[i], id_values[i]);
      }
    }
  }

function set_profit_qualifying_loss_text(qualifying_loss, potential_profit) {

  let pp_color = '#ffffff'
  if (potential_profit.toString().includes('-')) {
    pp_color = '#f91f1f';
    potential_profit = potential_profit.toString().replace('-', '-£');
  } else if (potential_profit != '0.00') {
    pp_color = '#00ff00';
    potential_profit = '£' + potential_profit.toString();
  } else {
    potential_profit = '£0';
  }


  $w('#pp-text').html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="color:${pp_color};" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">${potential_profit}</span></span></span></span></h2>`;


  let ql_color = '#ffffff'
  if (qualifying_loss.toString().includes('-')) {
    ql_color = '#f91f1f';
    qualifying_loss = qualifying_loss.toString().replace('-', '-£');
  } else if (qualifying_loss != '0.00') {
    ql_color = '#00ff00';
    qualifying_loss = '£' + qualifying_loss.toString();
  } else {
    qualifying_loss = '£0';
  }


  $w('#ql-text').html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="color:${ql_color};" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">${qualifying_loss}</span></span></span></span></h2>`;

}




function set_all_values_to_0(data) {

  let table_html_normal = '<h2 class="font_7 wixui-rich-text__text" style="font-size:14px; line-height:normal; text-align:center;"><span style="font-size:14px;" class="wixui-rich-text__text"><span style="color:#FFFFFF;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">&pound;0</span></span></span></span></h2>'

  function set_to_0(id) {

    $w('#' + id).html = table_html_normal;

  }

  let ids = ['bookmakerfirst', 'bookmakersecond', 'bookmakerthird', 'bookmakerfourth', 'exchangefirst', 'exchangesecond', 'exchangethird', 'exchangefourth', 'totalfirst', 'totalsecond', 'totalthird', 'totalfourth']

  ids.forEach((id) => {
    set_to_0(id);
  });

  // ALSO SET PROFIT ID TO 0

  $w('#backbet').html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="color:#EBEBEB;" class="wixui-rich-text__text"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text"><span style="font-weight:bold;" class="wixui-rich-text__text">Back</span>&nbsp;${data.horse}</span></span></span></span></h2>`;
  $w('#laybet').html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="color:#EBEBEB;" class="wixui-rich-text__text"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text"><span style="font-weight:bold;" class="wixui-rich-text__text">Lay</span>&nbsp;${data.horse}</span></span></span></span></h2>`;
  $w('#placelaybet').html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="color:#EBEBEB;" class="wixui-rich-text__text"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text"><span style="font-weight:bold;" class="wixui-rich-text__text">Lay</span>&nbsp;${data.horse}</span></span></span></span></h2>`;

  $w('#laystake').text = '£0';
  $w('#placelaystake').text = '£0';


  $w('#pp-text').html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="color:#ffffff;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">£0</span></span></span></span></h2>`;
  $w('#ql-text').html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="color:#ffffff;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">£0</span></span></span></span></h2>`;

  $w('#rating').html = `<h2 class="font_7 wixui-rich-text__text" style="font-size:16px; line-height:normal; text-align:center;"><span style="font-size:16px;" class="wixui-rich-text__text"><span style="color:#ffffff;" class="wixui-rich-text__text"><span style="font-family:arial,ｍｓ ｐゴシック,ms pgothic,돋움,dotum,helvetica,sans-serif;" class="wixui-rich-text__text"><span style="letter-spacing:normal;" class="wixui-rich-text__text">0</span></span></span></span></h2>`;

} 


function set_lay_stake_and_text(data, values) {

  $w('#laystake').text = '£' + values.lay_stake.toString();

  $w('#placelaystake').text = '£' + values.place_lay_stake.toString();

  set_html_of_instructions(data, values);

}


function set_html_of_instructions(data, values) {

  const html = get_html(data, values);

  $w('#backbet').html = html.back_bet;
  $w('#laybet').html = html.lay_bet;
  $w('#placelaybet').html = html.place_lay_bet;

  const o_f_obj = get_outcome_and_fixture(data);

  $w('#fixture').html = `${html.fixture}${o_f_obj.fixture}</span></span></span></span></span></h2>`
  $w('#dateandtime').html = `${html.dateandtime}${formatDate(data.date_and_time.replace(' ', ' @ '))}</span></span></span></span></h2>`
  $w('#extraplaceinfo').html = `${html.dateandtime}${o_f_obj.epinf}</span></span></span></span></h2>`

  

  $w('#backbet').onClick(() => {
    copy_stake_to_clipboard(values.back_stake);

    set_back_bet_to_copied(data, values);

    setTimeout(() => {
      set_back_and_lay_bet_html(data, values, 'back');
    }, 1000);

  });

  $w('#laybet').onClick(() => {
    copy_stake_to_clipboard(values.lay_stake);

    set_lay_bet_to_copied(data, values);

    setTimeout(() => {
      
      set_back_and_lay_bet_html(data, values, 'lay');
      
    }, 1000);

  });


  $w('#placelaybet').onClick(() => {
    copy_stake_to_clipboard(values.place_lay_stake);

    set_place_lay_bet_to_copied(data, values);

    setTimeout(() => {
      
      set_back_and_lay_bet_html(data, values, 'place');
      
    }, 1000);

  });


}



function copy_stake_to_clipboard(text) {

  wixWindow.copyToClipboard(text)

}





async function add_to_profit_tracker(data) {

    let date = convertDateToFullYear(data.date_and_time.split(' ')[0]);

    let bookie = data.bookmaker;
    let exchange = data.win_exchange;
    let place_exchange = data.place_exchange;

    let calculator = 'extraplace';
    let stakereturned = false;

    let bet_type = 'Extra Place Bet on ';

    let description = bet_type + bookie + ' betting on ' + $w('#backbet').text.replace('Back', '').trim() + ' (offering ' + data.bookmaker_places + ' Places at ' + data.bookmaker_fraction + ' odds) at the ' + data.fixture + ', Win lay bet placed on ' + exchange + ' @' + $w('#laybet').text.split('@')[1] + ', Lay bet for ' + data.exchange_places + ' Places placed on ' + place_exchange + ' @' + $w('#placelaybet').text.split('@')[1] + '.'; 
    
    
    if ($w('#description').value != '') {
      description = $w('#description').value;
    }
    
    const betID = `bet_${Date.now()}_${Math.floor(Math.random() * 1000)}`;


    let potential_profit = $w('#pp-text').text;
    let qualifying_loss = $w('#ql-text').text;


    const newBet = {
      iscalc: true,
      calculator: calculator,
      backodds: $w('#backodds').value,
      layodds: $w('#layodds').value + ',' + $w('#placelayodds').value,
      backstake: $w('#backstake').value,
      commission: $w('#laycomm').value + ',' + $w('#placelaycomm').value,
      places: data.bookmaker_places + ',' + data.exchange_places,
      placefraction: data.bookmaker_fraction.split('/')[1],
      stakereturned: stakereturned,
      date: date,
      bookie: bookie,
      exchange: exchange,
      place_exchange: place_exchange,
      description: description.replace(/\s+/g, " "),
      actualprofit: '',
      potentialprofit: potential_profit,
      qloss: qualifying_loss,
      complete: false,
      betId: betID,
      userId: userId,
      ispayout: false,
      oddsmatcher_type: 'Extra Place',
      bookmaker_link: data.bookmaker_link,
      exchange_link: data.win_exchange_link,
      fixture: data.fixture,
      outcome: data.horse + ' EP',

    };



      // ADD TO PROFIT TRACKER

      await wixData.insert("ProfitTracker", newBet)
      .then(() => {
        setTimeout(() => {
          wixLocation.to("/betting-profit-tracker");
        }, 1000);
      });


}


function convertDateToFullYear(dateStr) {
    const parts = dateStr.split('/');
    const year = parseInt(parts[2], 10);
    const fullYear = year < 50 ? 2000 + year : 1900 + year;  // Adjust based on the century cutoff
    return `${parts[0]}/${parts[1]}/${fullYear}`;
}



function set_back_bet_to_copied(data, values) {

  let style_for_stake = 'style="border-bottom: 2px dotted #EBEBEB; padding-bottom: 1px; cursor:pointer;"';

    $w('#backbet').html = `<div style="text-align: center; font-family: Arial, sans-serif; color: #EBEBEB; position: relative;">
                  <span style="font-size: 16px; line-height: 20px;">
                      <strong>Back</strong>&nbsp;${data.horse} @ 
                      <strong>${values.back_odds}</strong> with a 
                      <span ${style_for_stake}>Copied</span>
                  </span>
                  <img src="https://i.ibb.co/k8v1LKV/New-Project-6.png" style="width: 20px; height: 20px; margin-left: 5px; position: absolute; transform: translateY(25%);" alt="icon">
              </div>`;
}


function set_lay_bet_to_copied(data, values) {

  // FIX THIS SO IT TAKES THE NEW FORM OF THE HTML

  let style_for_stake = 'style="border-bottom: 2px dotted #EBEBEB; padding-bottom: 1px; cursor:pointer;"';

  let win_outcome = data.horse + ' To Win';
  
  $w('#laybet').html = `<div style="text-align: center; font-family: Arial, sans-serif; color: #EBEBEB; position: relative;">
                  <span style="font-size: 16px; line-height: 20px;">
                      <strong>Lay</strong>&nbsp;${win_outcome} @ 
                      <strong>${values.lay_odds}</strong> with a 
                      <span ${style_for_stake}>Copied!</span>
                  </span>
                  <img src="https://i.ibb.co/k8v1LKV/New-Project-6.png" style="width: 20px; height: 20px; margin-left: 5px; position: absolute; transform: translateY(25%);" alt="icon">
              </div>`;
  
}

function set_place_lay_bet_to_copied(data, values) {

  // FIX THIS SO IT TAKES THE NEW FORM OF THE HTML

  let style_for_stake = 'style="border-bottom: 2px dotted #EBEBEB; padding-bottom: 1px; cursor:pointer;"';

  let place_outcome = data.horse + ' To Finish Top ' + data.exchange_places;
  
  $w('#placelaybet').html = `<div style="text-align: center; font-family: Arial, sans-serif; color: #EBEBEB; position: relative;">
                  <span style="font-size: 16px; line-height: 20px;">
                      <strong>Lay</strong>&nbsp;${place_outcome} @ 
                      <strong>${values.place_lay_odds}</strong> with a 
                      <span ${style_for_stake}>Copied!</span>
                  </span>
                  <img src="https://i.ibb.co/k8v1LKV/New-Project-6.png" style="width: 20px; height: 20px; margin-left: 5px; position: absolute; transform: translateY(25%);" alt="icon">
              </div>`
  
}


function set_back_and_lay_bet_html(data, values, type) {

  const html = get_html(data, values);

  if (type == 'lay') {
    $w('#laybet').html = html.lay_bet;
  } else if (type == 'back') {
    $w('#backbet').html = html.back_bet;
  } else if (type == 'place') {
    $w('#placelaybet').html = html.place_lay_bet;
  }
}


*/







