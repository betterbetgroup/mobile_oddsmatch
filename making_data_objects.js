

let skybet_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
            {
                "type": "info",
                "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
              },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
              "type": "text",
              "content": "2) Create an account with Skybet. Use the button below to automatically apply the promotion."
            },
            {
            "type": "button",
            "content": "Sign up to Skybet",
            "url": "https://register.skybet.com/account/registration?promotionCode=AB5G30&returnURL=https%3A%2F%2Fpromos.skybet.com%2Fpromotion%3FpromoCode%3Dbg30freebet04", 
            "style": "primary"
            },
            {
                "type": "text",
                "content": "3) Once registered, deposit £5 into your account using a debit card, you will need this for the qualifying bet."
            },
              {
                "type": "warning",
                "content": "Customers using Neteller or Skrill for deposits are excluded."
              }
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
              "type": "text",
              "content": "1) Visit the Skybet homepage or click the button below."
            },
            {
                "type": "button",
                "content": "Skybet Homepage",
                "url": "https://skybet.com/", 
                "style": "secondary"
                },
                {
                    "type": "text",
                    "content": "2) Scroll to the bottom of the page and switch it from fractional to decimal odds display."
                  },
                  {
                    "type": "text",
                    "content": "3) If you cannot find it simply use Ctrl + F (Cmd + F on Mac) and search for 'Odds Display'."
                  },
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bets, you first need to place a £5 qualifying back bet on Skybet. You can use the oddsmatcher below to find a suitable event."
              },
              {
                "type": "info",
                "content": "The minimum required stake is actually 5p, but you should use £5 in order to mimic a real customer."
              },
              {
                "type": "text",
                "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Skybet as well as placing a lay bet on the same event on Smarkets."
              },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive £30 in free bets, which you can profit from in the next step."
            },
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 2.00 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 2.00)."
            },
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
                "sports": [
                    "Football",
                ],
                "markets": [
                    "Match Odds",
                ],
                "bookmakers": [
                    "Skybet"
                ],
                "exchanges": [
                    "Smarkets"
                ],
                "startTime": "",
                "minLiquidity": null,
                "minBackOdds": 2,
                "maxBackOdds": null,
                "minRating": null,
                "maxRating": null,
                "minQualifyingLoss": null,
                "minPotentialProfit": null
            },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "5",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
            {
                "type": "info",
                "content": "Within 10 hours of your qualifying bet settling, Skybet will credit your account with 3 X £10 free bets."
              },
              {
                "type": "text",
                "content": "1) Once the free bets arrive, you should use all three at once on the same selection. This way, you only need to place one lay bet. However, if you prefer, you can do them one at a time by changing the stake to £10 in the oddsmatcher dropdown."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event, this oddsmatcher automatically sorts the events by their profitability."
              },
              {
                "type": "warning",
                "content": "Higher odds mean higher profit, but also higher liability. You'll need to deposit more into Smarkets to cover the lay side."
              },
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
                "sports": [
                    "Football",
                ],
                "markets": [
                    "Match Odds",
                ],
                "bookmakers": [
                    "Skybet"
                ],
                "exchanges": [
                    "Smarkets"
                ],
                "startTime": "",
                "minLiquidity": null,
                "minBackOdds": null,
                "maxBackOdds": null,
                "minRating": null,
                "maxRating": null,
                "minQualifyingLoss": null,
                "minPotentialProfit": null
            },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "30",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }
    

let coral_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
              "type": "text",
              "content": "2) Create an account with Coral. Use the button below to automatically apply the promotion."
            },
            {
            "type": "button",
            "content": "Sign up to Coral",
            "url": "https://www.coral.co.uk/en/sports/promotions/details/newcustomeroffer", 
            "style": "primary"
            },
            {
                "type": "text",
                "content": "3) Once registered, deposit £5 into your account using a debit card, you will need this for the qualifying bet."
              },
              {
                "type": "warning",
                "content": "You must use a debit card and not any other payment method, otherwise your bet will not qualify."
              }
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Log in to your Coral account and go to 'My Account'."
          },
          {
            "type": "text",
            "content": "2) From there, navigate to 'Settings' and then 'Betting Settings'."
          },
          {
            "type": "text",
            "content": "3) Change your odds preference to 'Decimal'."
          },
    
    
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bets, you first need to place a £5 qualifying back bet on Coral. You can use the oddsmatcher below to find a suitable event."
              },
    
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 1.50 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.50)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Coral as well as placing a lay bet on the same event on Smarkets."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive £20 in free bets, which you can profit from in the next step."
            },
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Coral"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 1.5,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "5",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
            {
                "type": "info",
                "content": "After placing your qualifying bet, Coral will credit your account with 4 X £5 free bets. If you haven't received them yet then you might need to wait for the bet to settle."
              },
              {
                "type": "text",
                "content": "1) Once the free bets arrive, you have to profit from them one at a time as the free bets must be used on different events."
              },
              {
                "type": "warning",
                "content": "Bear in mind that the free bets are only valid for 7 days, so you must use them within this time."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
              {
                "type": "text",
                "content": "3) Repeat this process until you have used all 4 free bets."
              },
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Coral"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "5",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }


let ladbrokes_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
              "type": "text",
              "content": "2) Create an account with Ladbrokes. Use the button below to automatically apply the promotion."
            },
            {
            "type": "button",
            "content": "Sign up to Ladbrokes",
            "url": "https://www.ladbrokes.com/en/sports/promotions/details/bet5get20", 
            "style": "primary"
            },
            {
                "type": "text",
                "content": "3) Once registered, deposit £5 into your account using a debit card, you will need this for the qualifying bet."
              },
              {
                "type": "warning",
                "content": "Do not deposit via Prepaid Cards, Moneybookers, InstantBank, PayPal, Paysafe, Neteller or Skrill."
              }
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Log in to your Ladbrokes account and go to 'My Account'."
          },
          {
            "type": "text",
            "content": "2) From there, navigate to 'Settings'."
          },
          {
            "type": "text",
            "content": "3) Under 'Betting Settings', select 'Decimal' as your odds format."
          }
    
    
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bets, you first need to place a £5 qualifying back bet on Ladbrokes. You can use the oddsmatcher below to find a suitable event."
              },
    
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 1.50 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.50)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Ladbrokes as well as placing a lay bet on the same event on Smarkets."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive £20 in free bets, which you can profit from in the next step."
            },
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Ladbrokes"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 1.5,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "5",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
            {
                "type": "info",
                "content": "Once your qualifying bet has been placed, Ladbrokes will credit your account with 4 X £5 free bets."
              },
              {
                "type": "text",
                "content": "1) Once the free bets arrive, you have to profit from them one at a time as the free bets must be used on different events."
              },
              {
                "type": "warning",
                "content": "Bear in mind that the free bets are only valid for 7 days, so you must use them within this time."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
              {
                "type": "text",
                "content": "3) Repeat this process until you have used all 4 free bets."
              },
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Ladbrokes"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "5",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }


let virgin_bet_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
                "type": "warning",
                "content": "Bear in mind that Virgin Bet is associated with Livescore Bet, so you should leave at least a week between registering for both accounts."
              },
            {
              "type": "text",
              "content": "2) Create an account with Virgin Bet. Use the button below to automatically apply the promotion."
            },
            {
            "type": "button",
            "content": "Sign up to Virgin Bet",
            "url": "https://www.virginbet.com/promotions/637ceb119d81c3018cdf3e2e", 
            "style": "primary"
            },
            {
                "type": "text",
                "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
              },
              {
                "type": "warning",
                "content": "Do not deposit via prepaid/virtual cards or unidentifiable payment methods otherwise your bet will not qualify."
              }
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Go to the 'More' section of Virgin Bet or click the button below."
          },
          {
            "type": "button",
            "content": "Virgin Bet More Section",
            "url": "https://www.virginbet.com/more", 
            "style": "secondary"
          },
          {
            "type": "text",
            "content": "2) Go to 'Settings'."
          },
          {
            "type": "text",
            "content": "3) Click on 'Odds Format' and change it to 'Decimal Odds'."
          }
    
    
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on Virgin Bet. You can use the oddsmatcher below to find a suitable event."
              },
    
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 1.50 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.50)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Virgin Bet as well as placing a lay bet on the same event on Smarkets."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive £20 in free bets, which you can profit from in the next step."
            },
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Virgin Bet"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 1.5,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "10",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
            {
                "type": "info",
                "content": "Once your qualifying bet has settled you can claim 2 X £10 free bets in the Virgin Bet promotions page."
              },
              {
                "type": "text",
                "content": "1) Once the free bets arrive, you have to profit from them one at a time as the free bets must be used on different events."
              },
              {
                "type": "warning",
                "content": "Bear in mind that the free bets are only valid for 7 days, so you must use them within this time."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
              {
                "type": "text",
                "content": "3) Repeat this process with your other £10 free bet."
              },
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Virgin Bet"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "10",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }


let paddy_power_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
              "type": "text",
              "content": "2) Create an account with Paddy Power and use the Promo Code 'YSKAST'. If you can't find the box to enter the promo code then it has been automatically applied, so you can carry on."
            },
            {
            "type": "button",
            "content": "Sign up to Paddy Power",
            "url": "https://promos.paddypower.com/promotion?promoCode=ACQB5G30YSKASTP", 
            "style": "primary"
            },
            {
                "type": "text",
                "content": "3) Once registered, deposit £5 into your account using a debit card, you will need this for the qualifying bet."
              },
              {
                "type": "warning",
                "content": "Only debit card and Apple Pay deposits qualify. Avoid e-wallets like Skrill, Paysafe, PayPal and Neteller."
              }
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Head over to the 'Settings' page on Paddy Power or click the button below."
          },
          {
            "type": "button",
            "content": "Paddy Power Settings",
            "url": "https://www.paddypower.com/settings", 
            "style": "secondary"
          },
          {
            "type": "text",
            "content": "2) Click on 'Decimal'."
          },
    
    
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bet, you first need to place a £5 qualifying back bet on Paddy Power. You can use the oddsmatcher below to find a suitable event."
              },
    
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 2.0 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 2.0)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Paddy Power as well as placing a lay bet on the same event on Smarkets."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive a £30 free bet, which you can profit from in the next step."
            },
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Paddy Power"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 2,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "5",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
            {
                "type": "info",
                "content": "Once your qualifying bet has settled you will receive a £30 free bet from Paddy Power."
              },
              {
                "type": "text",
                "content": "1) You must use this free bet within the next 30 days otherwise it will expire."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
              {
                    "type": "warning",
                    "content": "Higher odds mean higher profit, but also higher liability. You'll need to deposit more into Smarkets to cover the lay side."
                  },
    
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Paddy Power"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "30",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }
    

let lottoland_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
              "type": "text",
              "content": "2) Create an account with Lottoland. Use the button below to automatically apply the promotion."
            },
            {
            "type": "button",
            "content": "Sign up to Lottoland",
            "url": "https://www.lottoland.co.uk/ob?code=SBK_WELCOME_OFFER_UK", 
            "style": "primary"
            },
            {
                "type": "text",
                "content": "3) Claim the offer in your promotions section."
              },
            {
                "type": "text",
                "content": "4) Deposit £10 into your account using a debit card, you will need this for the qualifying bet."
              },
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Navigate to the sports homepage on Lottoland."
          },
          {
            "type": "text",
            "content": "2) Scroll down to the bottom of the list of sports on the left-hand side of the page."
          },
          {
            "type": "text",
            "content": "3) Click on 'Fractional' and select 'Decimal' from the dropdown menu."
          }
    
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bet, you first need to place a £10 qualifying back bet on Lottoland. You can use the oddsmatcher below to find a suitable event."
              },
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 2.0 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 2.0)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Lottoland as well as placing a lay bet on the same event on Smarkets."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive a £10 free bet, which you can profit from in the next step."
            },
            {
                "type": "info",
                "content": "You need to tick the 'promotion opt in' on the Lottoland betslip before placing the bet."
            }
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Lottoland"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 2,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "10",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
    
              {
                "type": "text",
                "content": "1) Once your qualifying bet has settled you will receive a £10 free bet from Lottoland."
              },
              {
                "type": "info",
                "content": "This free bet is valid for 7 days and must be used at odds of 11.0 or lower."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
    
    
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Lottoland"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "10",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }


let bet365_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
              "type": "text",
              "content": "2) Create an account with Bet365."
            },
            {
            "type": "button",
            "content": "Sign up to Bet365",
            "url": "https://extra.bet365.com/promotions/en/open-account-offer", 
            "style": "primary"
            },
            {
                "type": "text",
                "content": "3) Claim the offer in the 'My Offers' section."
              },
            {
                "type": "text",
                "content": "4) Deposit £10 into your account using a debit card, you will need this for the qualifying bet."
              },
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Scroll down towards the bottom of the Bet365 homepage."
          },
          {
            "type": "text",
            "content": "2) Find the 'Odds Display' setting and change it to 'Decimal'."
          }
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bet, you first need to place a £10 qualifying back bet on Bet365. You can use the oddsmatcher below to find a suitable event."
              },
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 1.2 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.2)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Bet365 as well as placing a lay bet on the same event on Smarkets."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive a £30 free bet, which you can profit from in the next step."
            },
            {
                "type": "info",
                "content": "You actually receive a free bet which is 300% of the amount of your qualifying bet, however, this has a maximum value of £30."
            }
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Bet365"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 1.2,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "10",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
    
              {
                "type": "text",
                "content": "1) Within an hour of your qualifying bet settling you will receive a £30 free bet from Bet365."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
              {
                "type": "warning",
                "content": "Higher odds mean higher profit, but also higher liability. You'll need to deposit more into Smarkets to cover the lay side."
                },
    
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Bet365"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "30",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }
    

let spreadex_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
            "type": "text",
            "content": "2) Create an account with SpreadEx using the button below."
          },
          {
            "type": "button",
            "content": "Sign up to SpreadEx",
            "url": "https://www.spreadex.com/sports/offers/60-in-free-bets", 
            "style": "primary"
          },
          {
            "type": "text",
            "content": "3) Deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
          {
            "type": "warning",
            "content": "SpreadEx may require a phone call to verify your identity, so make sure you register with a working mobile number."
          },
          {
            "type": "warning",
            "content": "SpreadEx might run a credit check which could appear on your credit report when lenders carry out similar checks."
          }
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Go to the SpreadEx homepage."
          },
          {
            "type": "text",
            "content": "2) Look towards the top right of the page for the 'Fixed Odds Display' setting."
          },
          {
            "type": "text",
            "content": "3) Click it and change from 'Fractional' to 'Decimal'."
          }
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on SpreadEx. You can use the oddsmatcher below to find a suitable event."
              },
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 1.5 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.5)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on SpreadEx as well as placing a lay bet on the same event on Smarkets."
            },
            {
                "type": "warning",
                "content": "This bet must be placed on 'Fixed Odds' and not 'Spread Betting'."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive around £60 worth of free bets, which you can profit from in the next steps."
            },
    
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "SpreadEx"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 1.5,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "10",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Standard Free Bets",
        "content": {
          "items": [
    
              {
                "type": "text",
                "content": "1) You will receive 3 X £10 standard free bets from SpreadEx, these will be added to your account once per day over the next 3 days."
              },
              {
                "type": "info",
                "content": "These free bets are valid for 28 days and again must be used on 'Fixed Odds' and not 'Spread Betting'."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
              {
                "type": "text",
                "content": "3) Repeat this process for each of your 3 standard £10 free bets making sure to use a different event each time."
              },
              {
                "type": "text",
                "content": "4) Move onto the next step where you can profit from your 'Spread Betting' free bets."
              }
    
    
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "SpreadEx"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "10",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      },
    
      {
        "id": 5,
        "title": "Spread Betting Free Bets",
        "content": {
          "items": [
    
          {
            "type": "info",
            "content": "SpreadEx will also credit you with 3 X £5 'Spread Betting' free bets which can only be used on the 'Total Goals Football Spread' market, as well as 3 X £5 'Spread Betting' free bets which can only be used on the 'Winning Favorites Spread' horse racing market."
          },
    
          {
            "type": "text",
            "content": "1) These 6 X £5 free bets will be added to your account alongside your standard free bets."
          },
          {
            "type": "text",
            "content": "2) For all 6 of these free bets we recommend that you simply 'punt' them on the 'Buy' option, meaning you just use them on the 'Buy' option and don't place any lay bets. Choose odds between 1.5 and 3.0 and just hope some of them win."
          },
          {
            "type": "info",
            "content": "The 'Winning Favorites Spread' horse racing market can be found by clicking on a race meeting, not an individual race."
          },
          {
            "type": "text",
            "content": "3) You will also be credited with a £1 free bet for the 'Race Index Spread' market. You can find this by visiting the page of a specific race, then choosing a horse."
          },
    
          
    
    
          ],
        }
      },
    
    
    ]
    
    }


let sporting_index_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "warning",
              "content": "This offer is only available to residents of the UK. If you have already signed up to SpreadEx you might have already been credited with the free bets."
            },
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
            "type": "text",
            "content": "2) Create an account with Sporting Index using the button below."
          },
          {
            "type": "button",
            "content": "Sign up to Sporting Index",
            "url": "https://www.sportingindex.com/offers/60-in-free-bets", 
            "style": "primary"
          },
          {
            "type": "text",
            "content": "3) Deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
          {
            "type": "warning",
            "content": "Sporting Index may require a phone call to verify your identity, so make sure you register with a working mobile number."
          },
          {
            "type": "warning",
            "content": "Sporting Index might run a credit check which could appear on your credit report when lenders carry out similar checks."
          }
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Go to the Sporting Index homepage."
          },
          {
            "type": "text",
            "content": "2) Look towards the top right of the page for the 'Fixed Odds Display' setting."
          },
          {
            "type": "text",
            "content": "3) Click it and change from 'Fractional' to 'Decimal'."
          }
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on Sporting Index. You can use the oddsmatcher below to find a suitable event."
              },
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 1.5 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.5)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Sporting Index as well as placing a lay bet on the same event on Smarkets."
            },
            {
                "type": "warning",
                "content": "This bet must be placed on 'Fixed Odds' and not 'Spread Betting'."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive around £60 worth of free bets, which you can profit from in the next steps."
            },
    
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Sporting Index"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 1.5,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "10",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Standard Free Bets",
        "content": {
          "items": [
    
              {
                "type": "text",
                "content": "1) You will receive 3 X £10 standard free bets from Sporting Index, these will be added to your account once per day over the next 3 days."
              },
              {
                "type": "info",
                "content": "These free bets are valid for 28 days and again must be used on 'Fixed Odds' and not 'Spread Betting'."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
              {
                "type": "text",
                "content": "3) Repeat this process for each of your 3 standard £10 free bets making sure to use a different event each time."
              },
              {
                "type": "text",
                "content": "4) Move onto the next step where you can profit from your 'Spread Betting' free bets."
              }
    
    
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "Sporting Index"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "10",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      },
    
      {
        "id": 5,
        "title": "Spread Betting Free Bets",
        "content": {
          "items": [
    
          {
            "type": "info",
            "content": "Sporting Index will also credit you with 3 X £5 'Spread Betting' free bets which can only be used on the 'Total Goals Football Spread' market, as well as 3 X £5 'Spread Betting' free bets which can only be used on the 'Winning Favorites Spread' horse racing market."
          },
    
          {
            "type": "text",
            "content": "1) These 6 X £5 free bets will be added to your account alongside your standard free bets."
          },
          {
            "type": "text",
            "content": "2) For all 6 of these free bets we recommend that you simply 'punt' them on the 'Buy' option, meaning you just use them on the 'Buy' option and don't place any lay bets. Choose odds between 1.5 and 3.0 and just hope some of them win."
          },
          {
            "type": "info",
            "content": "The 'Winning Favorites Spread' horse racing market can be found by clicking on a race meeting, not an individual race."
          },
          {
            "type": "text",
            "content": "3) You will also be credited with a £1 free bet for the 'Race Index Spread' market. You can find this by visiting the page of a specific race, then choosing a horse."
          },
    
          
    
    
          ],
        }
      },
    
    
    ]
    
    }
    
    

let william_hill_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
                "type": "warning",
                "content": "William Hill are more prudent when checking new users, make sure to use your normal email address when signing up to help pass William Hill's background checks."
              },
            {
              "type": "text",
              "content": "2) Create an account with William Hill using a mobile device and use the promo code 'R30'. Use the button below to automatically apply the promotion."
            },
            {
                "type": "warning",
                "content": "You must sign up using a mobile device to qualify for this promotion."
              },
            {
            "type": "button",
            "content": "Sign up to William Hill",
            "url": "https://sports.williamhill.com/betting/en-gb/apps/promotions/offer/r30", 
            "style": "primary"
            },
            {
                "type": "text",
                "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
              },
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Click 'Odds Format' at the top of the page."
          },
          {
            "type": "text",
            "content": "2) Select 'Decimal'."
          }
    
    
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on William Hill using a mobile device. You can use the oddsmatcher below to find a suitable event."
              },
              {
              "type": "warning",
              "content": "This bet must be placed using a mobile device otherwise it will not qualify."
            },
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 1.50 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.50)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on William Hill as well as placing a lay bet on the same event on Smarkets."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive £30 in free bets, which you can profit from in the next step."
            },
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "William Hill"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 1.5,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "10",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
            {
                "type": "info",
                "content": "Once your qualifying bet has settled you will receive 3 X £10 free bets from William Hill."
              },
              {
                "type": "text",
                "content": "1) Once the free bets arrive, you have to profit from them one at a time as the free bets must be used on different events."
              },
              {
                "type": "warning",
                "content": "Bear in mind that the free bets are only valid for 7 days, so you must use them within this time."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
              {
                "type": "text",
                "content": "3) Repeat this until you have used all 3 X £10 free bets."
              },
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "William Hill"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "10",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }
    

    
let boylesports_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
          {
              "type": "info",
              "content": "You can use a different betting exchange if you prefer, but we recommend Smarkets for beginners."
            },
            {
              "type": "text",
              "content": "1) Open a Smarkets account if you do not have one already. You will require this to place lay bets."
            },
            {
              "type": "button",
              "content": "Sign up to Smarkets",
              "url": "https://smarkets.com/members/login",
              "style": "secondary"
            },
            {
                "type": "warning",
                "content": "This offer is only available to residents of Great Britain."
              },
            {
              "type": "text",
              "content": "2) Instead of following a link you should find the site manually to make sure you qualify for the promotion. Go to Google on a mobile device and search for 'boylesports'."
            },
            {
                "type": "info",
                "content": "We recommend that you use wifi instead of mobile data as BoyleSports might not credit your free bets if you are using mobile data. Also, you must use a mobile device."
              },
            {
                "type": "text",
                "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
              },
              {
                "type": "warning",
                "content": "You must use a debit card to deposit, pre-paid/virtual cards will not qualify."
              },
          ]
        }
      },
      {
        "id": 2,
        "title": "Change Odds",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "It's important to set the odds format to decimal to make calculations and comparisons easier."
            },
            {
            "type": "text",
            "content": "1) Click on 'My Account' at the top of the page."
          },
          {
            "type": "text",
            "content": "2) Click on 'Betting Preferences'."
          },
          {
            "type": "text",
            "content": "3) Select 'Decimal' from the Odds Display dropdown menu."
          }
    
    
    
          ]
        }
      },
      {
        "id": 3,
        "title": "Qualifying Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) To unlock your free bet, you first need to place a £10 qualifying back bet on BoyleSports using a mobile device. You can use the oddsmatcher below to find a suitable event."
              },
              {
              "type": "warning",
              "content": "This bet must be placed using a mobile device otherwise it will not qualify."
            },
    
            {
              "type": "warning",
              "content": "Your bet must be at minimum 2.00 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 2.00)."
            },
              {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on BoyleSports as well as placing a lay bet on the same event on Smarkets."
            },
            {
              "type": "text",
              "content": "3) Once your bet has settled, you should receive a £20 free bet, which you can profit from in the next step."
            },
    
            
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Qualifying Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "BoyleSports"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": 2,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "qualifying loss",
              "profit_header_text": "Qualifying<br>Loss",
              "stake": "10",
              "isfree": false,
              "laytype": "Standard"
            }
          }
        }
      },
      {
        "id": 4,
        "title": "Free Bets",
        "content": {
          "items": [
            {
                "type": "info",
                "content": "Within an hour of your qualifying bet settling you will receive a £20 free bet from BoyleSports."
              },
              {
                "type": "text",
                "content": "1) Once the free bet arrives, you must use it in the next 7 days otherwise it will expire."
              },
    
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
              },
    
    
          ],
          "oddsmatcher": {
            "oddsmatcher_title": "Free Bet Oddsmatcher",
            "type": "tutorial",
            "filters": {
        "sports": [
            "Football"
        ],
        "markets": [
            "Match Odds"
        ],
        "bookmakers": [
            "BoyleSports"
        ],
        "exchanges": [
            "Smarkets"
        ],
        "startTime": "",
        "minLiquidity": null,
        "minBackOdds": null,
        "maxBackOdds": null,
        "minRating": null,
        "maxRating": null,
        "minQualifyingLoss": null,
        "minPotentialProfit": null
    },
            "tutorial_info": {
              "current_sort": "potential profit",
              "profit_header_text": "Bet<br>Profit",
              "stake": "20",
              "isfree": true,
              "laytype": "Standard"
            }
          }
        }
      }
    ]
    
    }
    


let livescore_object = {}