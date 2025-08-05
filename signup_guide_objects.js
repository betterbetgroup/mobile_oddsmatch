

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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
                "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
    


// bet builder free bets
let livescore_object = {

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
                  "content": "Bear in mind that Livescore is associated with Virgin Bet, so you should leave at least a week between registering for both accounts."
                },
          {
            "type": "text",
            "content": "2) Create an account with Livescore. Use the button below to automatically apply the promotion."
          },
          {
          "type": "button",
          "content": "Sign up to Livescore",
          "url": "https://www.livescorebet.com/uk/promotions/66b0e974cf6e492f0f8d6499", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
            {
              "type": "warning",
              "content": "Do no use an online bank like Monzo or Starling for deposits otherwise your bet will not qualify."
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
            "content": "1) Go to the more section of Livescore or click the button below."
          },
          {
              "type": "button",
              "content": "Livescore More Section",
              "url": "https://www.livescorebet.com/uk/more", 
              "style": "secondary"
              },
              {
          "type": "text",
          "content": "2) Click on 'Settings' and then select 'Odds Format'."
        },
        {
          "type": "text",
          "content": "3) Change the format to 'Decimal Odds'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on Livescore. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Livescore as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £30 in free bets, which you can profit from in the next steps."
          },
  
          {
            "type": "warning",
            "content": "Your bet must be at minimum 1.50 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.50)."
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
                  "Livescore"
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
              "type": "info",
              "content": "Once your qualifying bet has settled, you will receive 2 X £10 standard free bets which you must accept in the promotions page."
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
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Repeat this process with your other £10 free bet. Then move on to the next step where you profit from your 2 X £5 Bet Builder free bets."
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
                  "Livescore"
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
      "title": "Bet Builder Free Bets",
      "content": {
        "items": [
          {
            "type": "info",
            "content": "Livescore will also credit you with 2 X £5 free bets which you have to use on a bet builder."
          },
          {
            "type": "text",
            "content": "1) Our oddsmatcher cannot help you with bet builder free bets, so you must find your bets manually."
          },
          {
            "type": "text",
            "content": "2) Read the guide below to learn how to lay bet builder free bets and guarantee a profit."
          },
          {
              "type": "button",
              "content": "How to Lay a Bet Builder",
              "url": "https://betterbetgroup.com/guide-to-laying-accumulators#how-to-lay-a-bet-builder", 
              "style": "secondary"
              },
              {
            "type": "text",
            "content": "3) Once you understand how bet builders work use our 'bet builder helper' below to choose your method."
          },
          {
              "type": "button",
              "content": "Bet Builder Helper",
              "url": "https://betterbetgroup.com/bet-builder-helper", 
              "style": "secondary"
              },
              {
            "type": "text",
            "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit."
          },
          {
              "type": "button",
              "content": "Standard Calculator",
              "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
              "style": "secondary"
              },
  
  
              {
            "type": "text",
            "content": "5) Repeat the process with your other £5 Bet Builder free bet."
          },
              
  
        ]
      }
    }
  ]
  
  }
  


// accumulator free bet
let betfred_object = {

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
            "content": "2) Create an account with Betfred. Use the button below to automatically apply the promotion."
          },
          {
          "type": "button",
          "content": "Sign up to Betfred",
          "url": "https://promotions.betfred.com/#/affiliates/sports/football/bet-10-get-50", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
            {
              "type": "warning",
              "content": "You must use a debit card for the deposit otherwise your bet will not qualify."
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
          "content": "1) 'Click on your account balance at the top of the page."
        },
        {
          "type": "text",
          "content": "2) Then go to 'Account Settings'."
        },
        {
          "type": "text",
          "content": "3) Look for 'Odds Format' and select 'Decimal'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on Betfred. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Betfred as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £50 in free bets, which you can profit from in the next steps."
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
                  "Betfred"
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
      "title": "Standard Free Bets",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "Within 10 hours of your qualifying bet settling, you will receive 3 X £10 standard free bets."
            },
            {
                  "type": "text",
                  "content": "1) Once the free bets arrive, you can profit from all £30 at once or do it £10 at a time."
                },
                {
                  "type": "warning",
                  "content": "Doing the full £30 at once might require a lot of liability on Smarkets, which isn't necessarily a bad thing, it just means you need a larger bankroll."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) When placing your bets on Betfred make sure you select 'Use my Free Bets Balance' in the betslip."
                },
                {
                  "type": "text",
                  "content": "4) Once you have profited from the standard free bets, whether one at a time or all in one go, you should move on to the next step where you can profit from your £20 accumulator free bet. "
                }
  
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
                  "Betfred"
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
    },
  
  
    {
      "id": 5,
      "title": "Accumulator Free Bet",
      "content": {
        "items": [
          {
            "type": "info",
            "content": "Betfred will also credit you with a £20 accumulator free bet which must have 4+ selections."
          },
          {
            "type": "text",
            "content": "1) When laying accumulator free bets, we recommend you use the Smarkets Acca Laying feature."
          },
          {
            "type": "text",
            "content": "2) Read the guide below to learn how to lay accumulator free bets and guarantee a profit using the Smarkets Acca Laying feature."
          },
          {
              "type": "button",
              "content": "How to Lay an Accumulator",
              "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
              "style": "secondary"
              },
  
          {
            "type": "text",
            "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 4 good matches to use."
          },
          {
              "type": "button",
              "content": "Standard Oddsmatcher",
              "url": "https://www.betterbetgroup.com/oddsmatcher", 
              "style": "secondary"
              },
              {
            "type": "text",
            "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit once you have set up your bets on Betfred and Smarkets."
          },
          {
              "type": "button",
              "content": "Standard Calculator",
              "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
              "style": "secondary"
              },
  
  
  
              
  
        ]
      }
    }
  ]
  
  }
  
  
// bet builder free bet - as well as separate horse racing and football free bets first
let betuk_object = {

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
            "content": "2) Create an account with BetUK. Use the button below and make sure you select the sports offer."
          },
          {
          "type": "button",
          "content": "Sign up to BetUK",
          "url": "https://promo.betuk.com/gb/generic-sports", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
            {
              "type": "warning",
              "content": "You must use a debit card for the deposit otherwise your bet will not qualify."
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
          "content": "1) Go to the football section of BetUK or click the button below."
        },
        {
          "type": "button",
          "content": "Visit BetUK",
          "url": "https://www.betuk.com/betting/football#filter/football", 
          "style": "secondary"
        },
        {
          "type": "text",
          "content": "2) Scroll down and click the 'Settings' button."
        },
        {
          "type": "text",
          "content": "3) Under 'Odds Format', select 'Decimal'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on BetUK. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on BetUK as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £30 in free bets, which you can profit from in the next steps."
          },
  
          {
            "type": "warning",
            "content": "Your bet must be at minimum 1.80 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.80)."
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
                  "BetUK"
              ],
              "exchanges": [
                  "Smarkets"
              ],
              "startTime": "",
              "minLiquidity": null,
              "minBackOdds": 1.8,
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
      "title": "Football Free Bet",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "Once your qualifying bet has settled, you will receive 1 X £10 football free bet, 1 X £10 horse racing free bet and 1 X £10 bet builder free bet."
            },
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £10 football free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this football free bet, you should move onto the next step where you can profit from your £10 horse racing free bet."
                }
  
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
                  "BetUK"
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
      "title": "Horse Racing Free Bet",
      "content": {
        "items": [
  
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £10 horse racing free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this horse racing free bet, you should move onto the next step where you can profit from your £10 bet builder free bet."
                }
  
        ],
        "oddsmatcher": {
          "oddsmatcher_title": "Free Bet Oddsmatcher",
          "type": "tutorial",
          "filters": {
              "sports": [
                  "Horse Racing",
              ],
              "markets": [
                  "Winner",
              ],
              "bookmakers": [
                  "BetUK"
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
        "id": 6,
        "title": "Bet Builder Free Bet",
        "content": {
          "items": [
            {
              "type": "text",
              "content": "1) Your £10 bet builder free bet must be used on a bet builder at odds of 4.0 or greater. Unfortunately our oddsmatcher cannot help you with bet builder free bets, so you must find your bets manually."
            },
            {
              "type": "text",
              "content": "2) Read the guide below to learn how to lay bet builder free bets and guarantee a profit."
            },
            {
                "type": "button",
                "content": "How to Lay a Bet Builder",
                "url": "https://betterbetgroup.com/guide-to-laying-accumulators#how-to-lay-a-bet-builder", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "3) Once you understand how bet builders work use our 'bet builder helper' below to choose your method."
            },
            {
                "type": "button",
                "content": "Bet Builder Helper",
                "url": "https://betterbetgroup.com/bet-builder-helper", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit."
            },
            {
                "type": "button",
                "content": "Standard Calculator",
                "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                "style": "secondary"
                },
    
   
    
          ]
        }
      }
  ]
  
  }

  
// accumulator free bet - as well as separate horse racing and football free bets first
let kwiff_object = {

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
              "content": "This offer is not available on the Kwiff mobile app."
            },
          {
            "type": "text",
            "content": "2) Create an account with Kwiff using the button below."
          },
          {
          "type": "button",
          "content": "Sign up to Kwiff",
          "url": "https://welcome.kwiff.com/", 
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
          "content": "1) Click on your profile icon at the top of the page."
        },
        {
          "type": "text",
          "content": "2) Click on 'My Account'."
        },
        {
          "type": "text",
          "content": "3) Click on 'Preferences'."
        },
        {
          "type": "text",
          "content": "4) Click on 'Decimal'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on Kwiff. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Kwiff as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £30 in free bets, which you can profit from in the next steps."
          },
  
          {
            "type": "warning",
            "content": "Your bet must be at minimum 2.00 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 2.00)."
          },
          {
            "type": "info",
            "content": "4) The Kwiff odds are generally quite bad, therefore your qualifying loss might be slightlyhigher than with other bookmaker offers."
          }
          
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
                  "Kwiff"
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
      "title": "Football Free Bet",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "Once your qualifying bet has settled, you will receive 1 X £10 football free bet, 1 X £10 horse racing free bet and 1 X £10 accumulator free bet."
            },
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £10 football free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this football free bet, you should move onto the next step where you can profit from your £10 horse racing free bet."
                }
  
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
                  "Kwiff"
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
      "title": "Horse Racing Free Bet",
      "content": {
        "items": [
  
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £10 horse racing free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this horse racing free bet, you should move onto the next step where you can profit from your £10 accumulator free bet."
                }
  
        ],
        "oddsmatcher": {
          "oddsmatcher_title": "Free Bet Oddsmatcher",
          "type": "tutorial",
          "filters": {
              "sports": [
                  "Horse Racing",
              ],
              "markets": [
                  "Winner",
              ],
              "bookmakers": [
                  "Kwiff"
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
        "id": 6,
        "title": "Accumulator Free Bet",
        "content": {
          "items": [
  
            {
              "type": "text",
              "content": "1) Your £10 accumulator free bet must have 4+ football selections. When laying accumulator free bets, we recommend you use the Smarkets Acca Laying feature."
            },
            {
              "type": "text",
              "content": "2) Read the guide below to learn how to lay accumulator free bets and guarantee a profit using the Smarkets Acca Laying feature."
            },
            {
                "type": "button",
                "content": "How to Lay an Accumulator",
                "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
                "style": "secondary"
                },
    
            {
              "type": "text",
              "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 4 good matches to use."
            },
            {
                "type": "button",
                "content": "Standard Oddsmatcher",
                "url": "https://www.betterbetgroup.com/oddsmatcher", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit once you have set up your bets on Kwiff and Smarkets."
            },
            {
                "type": "button",
                "content": "Standard Calculator",
                "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                "style": "secondary"
                },
    
    
    
                
    
          ]
        }
      }
  ]
  
  }
  

// accumulator free bet and bet bulder free bet.
let dazn_bet_object = {

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
            "content": "2) Create an account with DAZN Bet using the button below."
          },
          {
          "type": "button",
          "content": "Sign up to DAZN Bet",
          "url": "https://www.daznbet.com/en-gb/promotions", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
          {
            "type": "warning",
            "content": "If you deposit using Monzo you will not qualify for the promotion."
          },
          {
              "type": "text",
              "content": "4) Then press 'Opt in' on the promotion page linked below."
          },
          {
          "type": "button",
          "content": "Sign up to DAZN Bet",
          "url": "https://www.daznbet.com/en-gb/promotions?tab=welcome-sports-uk", 
          "style": "secondary"
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
          "content": "1) Click the cog icon in the top right corner of your betslip."
        },
        {
          "type": "text",
          "content": "2) Next to 'Odds Type', select 'Decimal'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on DAZN Bet. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on DAZN Bet as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £10 in free bets, which you can profit from in the next steps."
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
                  "DAZN Bet"
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
          "title": "Bet Builder Free Bet",
          "content": {
            "items": [
              {
                "type": "info",
                "content": "Once your qualifying bet settles you will receive 1 X £5 bet builder free bet as well as 1 X £5 accumulator free bet."
              },
              {
                "type": "text",
                "content": "1) First you should profit from your £5 bet builder free bet. Unfortunately our oddsmatcher cannot help you with bet builder free bets, so you must find your bets manually."
              },
              {
                "type": "text",
                "content": "2) Read the guide below to learn how to lay bet builder free bets and guarantee a profit."
              },
              {
                  "type": "button",
                  "content": "How to Lay a Bet Builder",
                  "url": "https://betterbetgroup.com/guide-to-laying-accumulators#how-to-lay-a-bet-builder", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "3) Once you understand how bet builders work use our 'bet builder helper' below to choose your method."
              },
              {
                  "type": "button",
                  "content": "Bet Builder Helper",
                  "url": "https://betterbetgroup.com/bet-builder-helper", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit."
              },
              {
                  "type": "button",
                  "content": "Standard Calculator",
                  "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                  "style": "secondary"
                  },
      
     
      
            ]
          }
        },
  
  
    
        {
          "id": 5,
          "title": "Accumulator Free Bet",
          "content": {
            "items": [
    
              {
                "type": "text",
                "content": "1) Your £5 accumulator free bet must have 3+ selections. When laying accumulator free bets, we recommend you use the Smarkets Acca Laying feature."
              },
              {
                "type": "text",
                "content": "2) Read the guide below to learn how to lay accumulator free bets and guarantee a profit using the Smarkets Acca Laying feature."
              },
              {
                  "type": "button",
                  "content": "How to Lay an Accumulator",
                  "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
                  "style": "secondary"
                  },
      
              {
                "type": "text",
                "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 3 good matches to use."
              },
              {
                  "type": "button",
                  "content": "Standard Oddsmatcher",
                  "url": "https://www.betterbetgroup.com/oddsmatcher", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit once you have set up your bets on Dazn Bet and Smarkets."
              },
              {
                  "type": "button",
                  "content": "Standard Calculator",
                  "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                  "style": "secondary"
                  },
      
      
      
                  
      
            ]
          }
        }
  
  
  ]
  
  }
  

// accumulator free bet and bet bulder free bet and a casino bonus
let unibet_object = {

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
            "content": "Both your qualifying bets and free bets must be placed and settled within 7 days of opening your account."
          },
          {
            "type": "text",
            "content": "2) Create an account with Unibet using the button below."
          },
          {
          "type": "button",
          "content": "Sign up to Unibet",
          "url": "https://www.unibet.co.uk/registration", 
          "style": "primary"
          },
          {
            "type": "text",
            "content": "3) During the sign up process, opt in to the 'Sports - Bet £10 Get £40' offer."
          },
          {
              "type": "text",
              "content": "4) Once registered and opted in, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
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
          "content": "1) Scroll to the bottom of the sports page."
        },
        {
          "type": "text",
          "content": "2) Click the 'Odds Format' dropdown."
        },
        {
          "type": "text",
          "content": "3) Select 'Decimal'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on Unibet. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Unibet as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £40 in free bets, which you can profit from in the next steps."
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
                  "Unibet"
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
          "title": "Bet Builder Free Bet",
          "content": {
            "items": [
              {
                "type": "info",
                "content": "Once your qualifying bet settles you will receive 1 X £10 bet builder free bet as well as 1 X £10 accumulator free bet as well as 1 X £20 casino bonus."
              },
              {
                "type": "text",
                "content": "1) First you should profit from your £10 bet builder free bet. Unfortunately our oddsmatcher cannot help you with bet builder free bets, so you must find your bets manually."
              },
              {
                "type": "text",
                "content": "2) Read the guide below to learn how to lay bet builder free bets and guarantee a profit."
              },
              {
                  "type": "button",
                  "content": "How to Lay a Bet Builder",
                  "url": "https://betterbetgroup.com/guide-to-laying-accumulators#how-to-lay-a-bet-builder", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "3) Once you understand how bet builders work use our 'bet builder helper' below to choose your method."
              },
              {
                  "type": "button",
                  "content": "Bet Builder Helper",
                  "url": "https://betterbetgroup.com/bet-builder-helper", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit."
              },
              {
                  "type": "button",
                  "content": "Standard Calculator",
                  "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                  "style": "secondary"
                  },
      
     
      
            ]
          }
        },
  
  
    
        {
          "id": 5,
          "title": "Accumulator Free Bet",
          "content": {
            "items": [
    
              {
                "type": "text",
                "content": "1) Your £10 accumulator free bet must have 4+ selections. When laying accumulator free bets, we recommend you use the Smarkets Acca Laying feature."
              },
              {
                "type": "text",
                "content": "2) Read the guide below to learn how to lay accumulator free bets and guarantee a profit using the Smarkets Acca Laying feature."
              },
              {
                  "type": "button",
                  "content": "How to Lay an Accumulator",
                  "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
                  "style": "secondary"
                  },
      
              {
                "type": "text",
                "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 4 good matches to use."
              },
              {
                  "type": "button",
                  "content": "Standard Oddsmatcher",
                  "url": "https://www.betterbetgroup.com/oddsmatcher", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit once you have set up your bets on Unibet and Smarkets."
              },
              {
                  "type": "button",
                  "content": "Standard Calculator",
                  "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                  "style": "secondary"
                  },
      
      
      
                  
      
            ]
          }
        },
  
  
  
  
  
        {
          "id": 6,
          "title": "Casino Bonus",
          "content": {
            "items": [
    
              {
                "type": "text",
                "content": "1) 1 Day after making your deposit you should receive a £20 casino bonus. This bonus will also expire after 7 days."
              },
              {
                "type": "text",
                "content": "2) The bonus must be wagered 50 times before you can withdraw it, therefore we recommend you use a high RTP slot such as 'Fortunes of Sparta'."
              },
              {
                "type": "warning",
                "content": "MAKE SURE YOU HAVE £0 IN YOUR MAIN BALANCE BEFORE YOU START SPINNING, OTHERWISE IT MAY GO INTO YOUR MAIN BALANCE."
              },
              {
                "type": "text",
                "content": "3) Keep repeating the high RTP slot with £1-£2 spins until you have wagered the bonus 50 times or you have lost the bonus, then you can withdraw it."
              }
  
   
      
            ]
          }
        }
  
  
  ]
  
  }


// money back if bet loses, so it's bonus lock in calc
let vbet_object = {

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
            "content": "2) Create an account with VBet using the button below."
          },
          {
          "type": "button",
          "content": "Sign up to VBet",
          "url": "https://www.vbet.co.uk/en/promotions/all/686471/sign-up-offer-10-free-bets", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
          {
              "type": "text",
              "content": "4) Opt in to the promotion on the page linked below."
          },
          {
            "type": "button",
            "content": "Opt in to the promotion",
            "url": "https://promo.vbet.co.uk/sport/sign-up-offer", 
            "style": "secondary"
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
          "content": "1) Click the three dots in the top right corner of the page."
        },
        {
          "type": "text",
          "content": "2) Then click the settings icon."
        },
        {
          "type": "text",
          "content": "3) Then click on the 'Odds Format' dropdown and select 'Decimal'."
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
              "type": "info",
              "content": "VBet will give you a £10 free bet if your first £10 bet loses. To profit from this offer you should use the bonus calculator - which uses a different calculation to the standard calculator."
            },
            {
              "type": "text",
              "content": "1) First you should head over to the standard oddsmatcher page and filter for the bookmaker 'VBet' and sort by potential profit as you're looking for higher odds for this bet."
            },
            {
              "type": "button",
              "content": "Standard Oddsmatcher",
              "url": "https://www.betterbetgroup.com/oddsmatcher", 
              "style": "secondary"
            },
          {
            "type": "text",
            "content": "2) Choose an event but don't complete the bet in the oddsmatcher, instead take the values and head over to the bonus calculator linked below."
          },
          {
            "type": "button",
            "content": "Bonus Calculator",
            "url": "https://www.betterbetgroup.com/bonus-calculator", 
            "style": "secondary"
          },
          {
            "type": "text",
            "content": "3) It should be in 'Bonus applied if bet loses' mode, as well as 'Standard' lay and the free bet checkbox should be off."
          },
          {
            "type": "text",
            "content": "4) Enter the back stake of £10. Enter the VBet back odds from the oddsmatcher as well as the lay odds."
          },
          {
            "type": "text",
            "content": "5) Set the maximum bonus to £10 and set the bonus retention to 80% as this is what you expect to make from the free bet."
          },
          {
            "type": "text",
            "content": "6) The calculator will tell you the stake that you need to lay, then you should place the two bets before coming back to the calculator and clicking 'Log Bet'."
          },
          {
            "type": "text",
            "content": "7) If your bet on VBet wins then you have made your profit and you have completed this offer. However if your bet on VBet loses then you should have made a small qualifying loss on this step but you will have gained a £10 free bet which you can profit from in the next step."
          },
  
  
          
        ],
  
      }
    },
  
  
  
  
    {
          "id": 4,
          "title": "Free Bet",
          "content": {
            "items": [
      
                {
                  "type": "info",
                  "content": "If your bet with VBet loses then you will have made a small loss on the last step but you will have gained a £10 free bet on VBet which you can profit from in this step."
                },
                {
                  "type": "text",
                  "content": "1) Within 24 hours of your qualifying bet settling you will receive a £10 free bet if your bet lost."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event for your free bet. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "warning",
                  "content": "You must use this free bet within the next 5 days otherwise it will expire."
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
              "VBet"
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
  

// bet builder free bet and accumulator free bet, as well as horse racing free bet and UFC free bet and free spins
let netbet_object = {

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
            "content": "2) Create an account with NetBet using the button below."
          },
          {
          "type": "button",
          "content": "Sign up to NetBet",
          "url": "https://sport.netbet.co.uk/promotions/welcome_offer/", 
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
          "content": "1) Go to the top right corner of the page and click on the settings icon."
        },
        {
          "type": "text",
          "content": "2) Under 'Odds Format' select 'Decimal'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on NetBet. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on NetBet as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £20 in free bets, which you can profit from in the next steps."
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
                  "NetBet"
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
      "title": "Horse Racing Free Bet",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "Within 24 hours of your qualifying bet settling, you will receive 1 X £5 horse racing free bet, 1 X £5 UFC free bet, 1 X £5 bet builder free bet, 1 X £5 accumulator free bet as well as 25 free spins."
            },
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £5 horse racing free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this horse racing free bet, you should move onto the next step where you can profit from your £5 UFC free bet."
                }
  
        ],
        "oddsmatcher": {
          "oddsmatcher_title": "Free Bet Oddsmatcher",
          "type": "tutorial",
          "filters": {
              "sports": [
                  "Horse Racing",
              ],
              "markets": [
                  "Winner",
              ],
              "bookmakers": [
                  "NetBet"
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
    },
  
    {
      "id": 5,
      "title": "UFC Free Bet",
      "content": {
        "items": [
  
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £5 UFC free bet."
                },
                {
                  "type": "text",
                  "content": "2) Unfortunately our oddsmatcher doesn't cover the UFC, therefore you will need to find your bet manually."
                },
                {
                  "type": "text",
                  "content": "3) Go through the NetBet and Smarkets UFC sections looking for a good match based on how close the back odds and lay odds are, aiming for back odds between 2.00 and 4.00."
                },
                {
                  "type": "text",
                  "content": "4) Use our standard calculator linked below in free bet mode to quickly check the profitabiltiy and then to also help you log your bet."
                },
                {
                  "type": "button",
                  "content": "Standard Calculator",
                  "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                  "style": "secondary"
                },
                {
                  "type": "text",
                  "content": "5) Once you have profited from this UFC free bet, you should move onto the next step where you can profit from your £5 bet builder free bet."
                }
  
        ]
      }
    },
  
  
  
  
  
  
    {
          "id": 6,
          "title": "Bet Builder Free Bets",
          "content": {
            "items": [
              {
                "type": "text",
                "content": "1) You will also receive a £5 bet builder free bet. Unfortunately our oddsmatcher cannot help you with bet builder free bets, so you must find your bets manually."
              },
              {
                "type": "text",
                "content": "2) Read the guide below to learn how to lay bet builder free bets and guarantee a profit."
              },
              {
                  "type": "button",
                  "content": "How to Lay a Bet Builder",
                  "url": "https://betterbetgroup.com/guide-to-laying-accumulators#how-to-lay-a-bet-builder", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "3) Once you understand how bet builders work use our 'bet builder helper' below to choose your method."
              },
              {
                  "type": "button",
                  "content": "Bet Builder Helper",
                  "url": "https://betterbetgroup.com/bet-builder-helper", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit."
              },
              {
                  "type": "button",
                  "content": "Standard Calculator",
                  "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                  "style": "secondary"
                  },
      
     
      
            ]
          }
        },
  
  
  
  
    {
        "id": 7,
        "title": "Accumulator Free Bet",
        "content": {
          "items": [
  
            {
              "type": "text",
              "content": "1) Your £5 accumulator free bet must have 3+ selections and each selection must be at least 2.00 odds. When laying accumulator free bets, we recommend you use the Smarkets Acca Laying feature."
            },
            {
              "type": "text",
              "content": "2) Read the guide below to learn how to lay accumulator free bets and guarantee a profit using the Smarkets Acca Laying feature."
            },
            {
                "type": "button",
                "content": "How to Lay an Accumulator",
                "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
                "style": "secondary"
                },
    
            {
              "type": "text",
              "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 3 good qualifying matches to use."
            },
            {
                "type": "button",
                "content": "Standard Oddsmatcher",
                "url": "https://www.betterbetgroup.com/oddsmatcher", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit once you have set up your bets on NetBet and Smarkets."
            },
            {
                "type": "button",
                "content": "Standard Calculator",
                "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                "style": "secondary"
                },
    
    
    
                
    
          ]
        }
      },
  
  
      {
      "id": 8,
      "title": "Free Spins",
      "content": {
        "items": [
          {
            "type": "info",
            "content": "Within 3 days of your qualifying bet being placed you will receive 25 free spins to use on the 'Big Bass Splash' slot."
          },
          {
          "type": "text",
          "content": "1) You might need to claim these free spins on the rewards page under the 'Free Spins' icon."
        },
        {
          "type": "text",
          "content": "2) Use the free spins on the 'Big Bass Splash' slot, bear in mind that the winnings are credited as cash up to a maximum of £5."
        },
  
  
        ]
      }
    }
  
  
  
      
  ]
  
  }
  

// bet builder free bet - as well as separate horse racing and football free bets first
let betmgm_object = {

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
            "content": "BetMGM is part of the LeoVegas group. If you have had an account closed with another site in this group, then your BetMGM account might get locked immediately."
          },
          {
            "type": "text",
            "content": "2) Create an account with BetMGM. Use the button below and make sure you select the sports welcome offer."
          },
          {
          "type": "button",
          "content": "Sign up to BetMGM",
          "url": "https://www.betmgm.co.uk/promotions/detail?welcomeOfferId=V2VsY29tZU9mZmVyOjc3Mjg3", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
            {
              "type": "info",
              "content": "You will have to verify your phone number using a verification code at some point."
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
          "content": "1) Go to the sports section of BetMGM or click the button below."
        },
        {
          "type": "button",
          "content": "Visit BetMGM",
          "url": "https://www.betmgm.co.uk/sports#all-sports", 
          "style": "secondary"
        },
        {
          "type": "text",
          "content": "2) Scroll down and click the 'Settings' button."
        },
        {
          "type": "text",
          "content": "3) Under 'Odds Format', select 'Decimal'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on BetMGM. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on BetMGM as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £40 in free bets, which you can profit from in the next steps."
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
                  "BetMGM"
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
      "title": "Football Free Bet",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "Once your qualifying bet has settled, you will receive 1 X £10 football free bet, 1 X £10 horse racing free bet and 2 X £10 bet builder free bets."
            },
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £10 football free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this football free bet, you should move onto the next step where you can profit from your £10 horse racing free bet."
                }
  
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
                  "BetMGM"
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
      "title": "Horse Racing Free Bet",
      "content": {
        "items": [
  
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £10 horse racing free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this horse racing free bet, you should move onto the next step where you can profit from your 2 X £10 bet builder free bets."
                }
  
        ],
        "oddsmatcher": {
          "oddsmatcher_title": "Free Bet Oddsmatcher",
          "type": "tutorial",
          "filters": {
              "sports": [
                  "Horse Racing",
              ],
              "markets": [
                  "Winner",
              ],
              "bookmakers": [
                  "BetMGM"
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
        "id": 6,
        "title": "Bet Builder Free Bets",
        "content": {
          "items": [
            {
              "type": "text",
              "content": "1) Both of your £10 bet builder free bets must be used on a bet builder at odds of 4.0 or greater. Unfortunately our oddsmatcher cannot help you with bet builder free bets, so you must find your bets manually."
            },
            {
              "type": "text",
              "content": "2) Read the guide below to learn how to lay bet builder free bets and guarantee a profit."
            },
            {
                "type": "button",
                "content": "How to Lay a Bet Builder",
                "url": "https://betterbetgroup.com/guide-to-laying-accumulators#how-to-lay-a-bet-builder", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "3) Once you understand how bet builders work use our 'bet builder helper' below to choose your method."
            },
            {
                "type": "button",
                "content": "Bet Builder Helper",
                "url": "https://betterbetgroup.com/bet-builder-helper", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit."
            },
            {
                "type": "button",
                "content": "Standard Calculator",
                "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                "style": "secondary"
                },
  
                {
                  "type": "text",
                  "content": "4) Once you have profited from your first £10 bet builder free bet, repeat the process for the second £10 bet builder free bet."
                }
    
   
    
          ]
        }
      }
  ]
  
  }


// qualifying bet is an accumulator, free bet is 4 X £5 horse racing + spins
let midnite_object = {

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
            "content": "2) Create an account with Midnite. Use the button below to automatically apply the promotion and make sure to select the horse racing offer."
          },
          {
          "type": "button",
          "content": "Sign up to Midnite",
          "url": "https://help.midnite.com/en/articles/9039273-welcome-offer-horse-racing", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Deposit £10 into your account using a debit card, you will need this for the qualifying bet."
            },
            {
              "type": "warning",
              "content": "Make sure your account is verified before placing your qualifying bet."
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
          "content": "1) Navigate to the preferences page on Midnite or click the button below."
        },
        {
          "type": "button",
          "content": "Preferences Page",
          "url": "https://www.midnite.com/account/preferences",
          "style": "secondary"
        },
        {
          "type": "text",
          "content": "2) In the 'Odds Format' dropdown select 'Decimal'."
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
            "content": "1) For your qualifying bet you need to place a £10 accumulator bet with 4 selections and odds of 4.00 or greater. When laying accumulator bets, we recommend you use the Smarkets Acca Laying feature."
          },
          {
            "type": "text",
            "content": "2) Read the guide below to learn how to lay accumulator bets using the Smarkets Acca Laying feature."
          },
          {
              "type": "button",
              "content": "How to Lay an Accumulator",
              "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
              "style": "secondary"
              },
  
          {
            "type": "text",
            "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 4 good matches to use."
          },
          {
              "type": "button",
              "content": "Standard Oddsmatcher",
              "url": "https://www.betterbetgroup.com/oddsmatcher", 
              "style": "secondary"
              },
              {
            "type": "text",
            "content": "4) Then use our standard calculator to calculate your stake and profit once you have set up your bets on Midnite and Smarkets. Make sure to use it in normal mode and not in free bet mode."
          },
          {
              "type": "button",
              "content": "Standard Calculator",
              "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
              "style": "secondary"
              },
  
  
  
                  
      
            ]
          }
        },
  
    
  
  
  
    {
      "id": 4,
      "title": "Free Bets",
      "content": {
        "items": [
  
            {
              "type": "text",
              "content": "1) Once your qualifying bet has settled you will receive 4 X £5 horse racing free bets from Midnite."
            },
            {
              "type": "info",
              "content": "These free bets are valid for 7 days."
            },
            {
              "type": "text",
              "content": "2) Use the oddsmatcher below to find a suitable event for each of your free bets. This oddsmatcher automatically sorts the events by their profitability."
            },
            {
              "type": "text",
              "content": "3) Repeat the process until you have profited from all 4 of your £5 free bets."
            },
  
  
  
        ],
        "oddsmatcher": {
          "oddsmatcher_title": "Free Bet Oddsmatcher",
          "type": "tutorial",
          "filters": {
      "sports": [
          "Horse Racing"
      ],
      "markets": [
          "Winner"
      ],
      "bookmakers": [
          "Midnite"
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
    },
  
  
    
    {
        "id": 5,
        "title": "Free Spins",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "You will also receive 50 free spins to use on the 'Big Bass Splash' slot."
            },
          {
            "type": "text",
            "content": "1) Use the free spins on the 'Big Bass Splash' slot, the winnings are credited as cash."
          },
    
    
          ]
        }
      }
  
  
  ]
  
  }

  
// accumulator free bet and a bet builder free bet a well as standard free bet
let parimatch_object = {

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
            "content": "Parimatch are owned by the same company as Betano, BetVictor, Puntit, Talksport BET. If you have already been restricted/banned by any of these other sites you will not have access to this promotion."
          },
          {
            "type": "text",
            "content": "2) Create an account with Parimatch. Use the button below."
          },
          {
          "type": "button",
          "content": "Sign up to Parimatch",
          "url": "https://www.parimatch.co.uk/en-gb/offer/XF11", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
            {
              "type": "warning",
              "content": "Do not deposit with an online bank such as Monzo/Starling otherwise you will not qualify."
            },
            {
              "type": "text",
              "content": "4) When prompted, Opt in to the 'Sports Welcome Offer - Bet £10 Get £20'. If you aren't prompted, you can find the promotion in the 'offers' section."
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
          "content": "1) Go to the preferences page on Parimatch or click the button below."
        },
        {
          "type": "button",
          "content": "Visit Parimatch",
          "url": "https://www.parimatch.co.uk/en-gb/preferences/edit?first_modal=true", 
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on Parimatch. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Parimatch as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £20 in free bets, which you can profit from in the next steps."
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
                  "Parimatch"
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
      "title": "Standard Free Bets",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "Once your qualifying bet has settled, you will receive 2 X £5 standard free bets, 1 X £5 bet builder free bet and 1 X £5 accumulator free bet."
            },
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your 2 X £5 standard free bets. Note that your second £5 free bet will be credited 24 hours after the first one is credited."
                },
                {
                  "type": "info", 
                  "content": "These standard free bets can't be used on the horse racing market and are valid for 7 days."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) When your second £5 free bet is credited, repeat the process using the oddsmatcher below."
                },
                {
                  "type": "text",
                  "content": "4) Once you have profited from your standard free bets, you should move onto the next step where you can profit from your £5 bet builder free bet."
                }
  
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
                  "Parimatch"
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
    },
  
  
  
    {
        "id": 5,
        "title": "Bet Builder Free Bet",
        "content": {
          "items": [
            {
              "type": "info",
              "content": "Sometimes Parimatch are crediting the £5 bet builder as a 4-fold accumulator comprised of 4 bet builders. When you add your bet builder to your betslip on Parimatch, if you don't see the free bet option then the following instructions won't work and you're better off punting the 4-fold bet builder accumulator."
            },
            {
              "type": "text",
              "content": "1) You will receive a £5 bet builder free bet which must be used on football and must have 4 or more selections in it. Unfortunately our oddsmatcher cannot help you with bet builder free bets, so you must find your bets manually."
            },
            {
              "type": "text",
              "content": "2) Read the guide below to learn how to lay bet builder free bets and guarantee a profit."
            },
            {
                "type": "button",
                "content": "How to Lay a Bet Builder",
                "url": "https://betterbetgroup.com/guide-to-laying-accumulators#how-to-lay-a-bet-builder", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "3) Once you understand how bet builders work use our 'bet builder helper' below to choose your method."
            },
            {
                "type": "button",
                "content": "Bet Builder Helper",
                "url": "https://betterbetgroup.com/bet-builder-helper", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit."
            },
            {
                "type": "button",
                "content": "Standard Calculator",
                "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                "style": "secondary"
                },
  
                {
                  "type": "text",
                  "content": "4) Once you have profited from your £5 bet builder free bet, move on to the next step to profit from your £5 accumulator free bet."
                }
    
   
    
          ]
        }
      },
  
  
  
    {
        "id": 6,
        "title": "Accumulator Free Bet",
        "content": {
          "items": [
  
            {
              "type": "text",
              "content": "1) Your £5 accumulator free bet must have 2+ football selections. When laying accumulator free bets, we recommend you use the Smarkets Acca Laying feature."
            },
            {
              "type": "text",
              "content": "2) Read the guide below to learn how to lay accumulator free bets and guarantee a profit using the Smarkets Acca Laying feature."
            },
            {
                "type": "button",
                "content": "How to Lay an Accumulator",
                "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
                "style": "secondary"
                },
    
            {
              "type": "text",
              "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 2 good matches to use."
            },
            {
                "type": "button",
                "content": "Standard Oddsmatcher",
                "url": "https://www.betterbetgroup.com/oddsmatcher", 
                "style": "secondary"
                },
                {
              "type": "text",
              "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit once you have set up your bets on Parimatch and Smarkets."
            },
            {
                "type": "button",
                "content": "Standard Calculator",
                "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                "style": "secondary"
                },
    
    
    
                
    
          ]
        }
      },
  
  
  
  
  
  
  
  
  
  ]
  
  }


// 200% profit boost
let talksport_bet_object = {

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
            "content": "TalkSPORT BET are owned by the same company as Betano, BetVictor, Puntit, Parimatch. If you have already been restricted/banned by any of these other sites you will not have access to this promotion."
          },
          {
            "type": "text",
            "content": "2) Create an account with TalkSPORT BET. Use the button below."
          },
          {
          "type": "button",
          "content": "Sign up to TalkSPORT BET",
          "url": "https://www.talksportbet.com/en-gb/offer/RL52", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £5 into your account using a debit card, you will need this for the qualifying bet."
          },
            {
              "type": "warning",
              "content": "Do not deposit with an online bank such as Monzo/Starling otherwise you will not qualify."
            },
            {
              "type": "text",
              "content": "4) When prompted, Opt in to the '3x Your Returns' offer. If you aren't prompted, you can find the promotion in the 'offers' section."
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
          "content": "1) Go to the preferences page on TalkSPORT BET or click the button below."
        },
        {
          "type": "button",
          "content": "Visit TalkSPORT BET",
          "url": "https://www.talksportbet.com/en-gb/preferences/edit?first_modal=true", 
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
              "content": "1) This offer gives you a 200% boost to your profits in the form of a free bet when you bet £5."
            },
            {
              "type": "info",
              "content": "Your bet must be at minimum 2.00 odds to qualify for the promotion and you must place it within 7 days of registering your account."
            },
            {
              "type": "text",
              "content": "2) Use our oddsmatcher below to find a profitable event."
            },
            {
              "type": "text",
              "content": "3) When you have found a good selection, you will now need to calculate the effective odds which factor in the 200% boosted winnings as a free bet."
            },
          
            {
              "type": "text",
              "content": "4) To get the effective odds, take your back odds in decimal form and subtract 1. Then, multiply this by 2.6. Then add 1 back on. So 2.5 back odds would become (2.5 - 1) x 2.6 + 1 = 3.9 effective odds."
            },
  
            {
              "type": "text",
              "content": "5) In the dropdown for that selection in the oddsmatcher change the back odds to the effective odds you calculated."
            },
  
            {
              "type": "text",
              "content": "6) Follow the instructions in the dropdown and place your bets on TalkSPORT BET and Smarkets."
            },
          
            {
            "type": "text",
            "content": "7) If your bet with TalkSPORT BET LOSES, you have finished this offer and you don't need to go to the next step. However, if your bet with TalkSPORT BET WINS, you will need to go to the next step to profit from your free bet."
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
                  "TalkSPORT BET"
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
      "title": "Free Bet",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "If your qualifying bet with TalkSPORT BET WINS, you will receive a £5 free bet which you can profit from in this step."
            },
  
                {
                  "type": "text",
                  "content": "1) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
  
                {
                  "type": "text",
                  "content": "2) When you open the oddsmatcher dropdown make sure you adjust the back stake to be the value of your free bet (it is defaulted to £5, but it's highly unlikely that's correct)."
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
                  "TalkSPORT BET"
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
    },
  
  
  
  
  
  ]
  
  }
  

// 100% profit boost
let leovegas_object = {

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
            "type": "info",
            "content": "When registering for LeoVegas make sure to select the 'Sports 100% Profit Boost' offer. To find this click on the arrow at the top before entering your email address."
          },
          {
            "type": "text",
            "content": "2) Create an account with LeoVegas. Use the button below."
          },
          {
          "type": "button",
          "content": "Sign up to LeoVegas",
          "url": "https://promo.leovegas.co.uk/gb/affiliates-sports", 
          "style": "primary"
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
          "content": "1) Go to the LeoVegas settings page or click the button below."
        },
        {
          "type": "button",
          "content": "Visit LeoVegas",
          "url": "https://www.leovegas.co.uk/betting#settings", 
          "style": "secondary"
        },
        {
          "type": "text",
          "content": "2) Under 'Odds Format', click on 'Decimal'."
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
              "content": "1) This offer gives you a 100% profit boost token for your first £10 in-play bet."
            },
            {
              "type": "info",
              "content": "The bet must be in-play (live) and must be at least 2.00 odds."
            },
            {
              "type": "text",
              "content": "2) Unfortunately our oddsmatcher does not support in-play bets, so you will need to find a bet on the sites manually."
            },
            {
              "type": "text",
              "content": "3) Find a live football match in the first half and look for a selection with odds between 2.00 and 4.00. Make sure the back odds on LeoVegas and lay odds on Smarkets are similar to maximise profit."
            },
            {
              "type": "text",
              "content": "4) When the game reaches half time, this is the best time to do the following steps so the odds don't change suddenly while you're placing bets."
            },
            {
              "type": "text",
              "content": "5) When you are ready, go to the standard betting calculator linked below and use it in normal mode. When entering the back odds simply enter the back odds multiplied by 2."
            },
            {
              "type": "button",
              "content": "Standard Calculator",
              "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
              "style": "secondary"
            },
  
            {
              "type": "text",
              "content": "6) Place your back bet on LeoVegas and your lay bet on Smarkets, then log the bet to your profit tracker."
            },
  
  
  
        ],
  
  
      }
    },
  
  
  
  
  ]
  
  }
  

//  separate horse racing and football free bets first and then an in play free bet
let sport888_object = {

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
                "content": "888Sport are more prudent when checking new users, make sure to use your normal email address when signing up to help pass 888Sport's background checks."
              },
          {
            "type": "text",
            "content": "2) Create an account with 888Sport using the button below and use the promo code '30FXS'."
          },
          {
          "type": "button",
          "content": "Sign up to 888Sport",
          "url": "https://www.888sport.com/online-sports-betting-promotions/", 
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
          "content": "1) Click on the settings icon at the top of the page."
        },
        {
          "type": "text",
          "content": "2) Select 'Decimal'."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on 888Sport. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on 888Sport as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £30 in free bets, which you can profit from in the next steps."
          },
  
          {
            "type": "warning",
            "content": "Your bet must be at minimum 1.50 odds to qualify for the promotion (the oddsmatcher automatically filters out events below 1.50)."
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
                  "888Sport"
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
      "title": "Football Free Bet",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "Once your qualifying bet has settled, you will receive 1 X £10 football free bet, 1 X £10 horse racing free bet and 1 X £10 in-play free bet."
            },
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £10 football free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this football free bet, you should move onto the next step where you can profit from your £10 horse racing free bet."
                }
  
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
                  "888Sport"
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
      "title": "Horse Racing Free Bet",
      "content": {
        "items": [
  
            {
                  "type": "text",
                  "content": "1) In this step you will profit from your £10 horse racing free bet."
                },
                {
                  "type": "text",
                  "content": "2) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
                },
                {
                  "type": "text",
                  "content": "3) Once you have profited from this horse racing free bet, you should move onto the next step where you can profit from your £10 in-play free bet."
                }
  
        ],
        "oddsmatcher": {
          "oddsmatcher_title": "Free Bet Oddsmatcher",
          "type": "tutorial",
          "filters": {
              "sports": [
                  "Horse Racing",
              ],
              "markets": [
                  "Winner",
              ],
              "bookmakers": [
                  "888Sport"
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
        "id": 6,
        "title": "In-Play Free Bet",
        "content": {
          "items": [
            {
                "type": "text",
                "content": "1) In this step you will profit from your £10 in-play free bet. This means you must use it on an event that is live."
              },
              {
                "type": "text",
                "content": "2) Unfortunately our oddsmatcher does not support in-play bets, so you will need to find a bet on the sites manually."
              },
              {
                "type": "text",
                "content": "3) Find a live football match in the first half and look for a selection with odds between 2.00 and 4.00. Make sure the back odds on 888Sport and lay odds on Smarkets are similar to maximise profit."
              },
              {
                "type": "text",
                "content": "4) When the game reaches half time, this is the best time to do the following steps so the odds don't change suddenly while you're placing bets."
              },
              {
                "type": "text",
                "content": "5) When you are ready, go to the standard betting calculator linked below and use it in free bet mode by ticking the 'Free Bet' checkbox. Then enter your bet details."
              },
              {
                "type": "button",
                "content": "Standard Calculator",
                "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                "style": "secondary"
              },
    
              {
                "type": "text",
                "content": "6) Place your back bet on 888Sport and your lay bet on Smarkets, then log the bet to your profit tracker."
              },
    
    
    
          ],
    
    
        }
      },
  ]
  
  }

  
// bet builder free bet, accumluator free bet, lucky dip free bet
let betvictor_object = {

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
              "content": "BetVictor are owned by the same company as Betano, TalkSPORT BET, Puntit, Parimatch. If you have already been restricted/banned by any of these other sites you will not have access to this promotion."
            },
          {
            "type": "text",
            "content": "2) Create an account with BetVictor using the button below."
          },
          {
          "type": "button",
          "content": "Sign up to BetVictor",
          "url": "https://www.betvictor.com/en-gb/offer/VU71B", 
          "style": "primary"
          },
          {
            "type": "text",
            "content": "3) During the sign up process, opt in to the 'Football Welcome Offer'. If you are not prompted you can find it in the 'Offers' section."
          },
          {
              "type": "text",
              "content": "4) Once registered, deposit £10 into your account using a debit card, you will need this for the qualifying bet."
          },
          {
            "type": "warning",
            "content": "Do not deposit with an online bank such as Monzo/Starling otherwise you will not qualify."
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
          "content": "1) Go to the BetVictor preferences page or click the button below."
        },
        {
          "type": "button",
          "content": "BetVictor Preferences",
          "url": "https://www.betvictor.com/en-gb/preferences/edit?first_modal=true", 
          "style": "secondary"
        },
        {
          "type": "text",
          "content": "2) Select 'Decimal' in the 'Odds Display' dropdown."
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
              "content": "1) To unlock your free bets, you first need to place a £10 qualifying back bet on BetVictor. You can use the oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on BetVictor as well as placing a lay bet on the same event on Smarkets."
            },
          {
            "type": "text",
            "content": "3) Once your bet has settled, you should receive £30 in free bets, which you can profit from in the next steps."
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
                  "BetVictor"
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
          "title": "Bet Builder Free Bets",
          "content": {
            "items": [
              {
                "type": "info",
                "content": "Once your qualifying bet settles you will receive 1 X £5 bet builder free bet as well as 1 X £5 accumulator free bet as well as 1 X £5 Lucky Dip free bet. Then, 24 hours after you will receive a futher £5 bet builder free bet as well as a £10 accumulator free bet."
              },
              {
                "type": "text",
                "content": "1) First you should profit from your initial £5 bet builder free bet. Unfortunately our oddsmatcher cannot help you with bet builder free bets, so you must find your bets manually."
              },
              {
                "type": "text",
                "content": "2) Read the guide below to learn how to lay bet builder free bets and guarantee a profit."
              },
              {
                  "type": "button",
                  "content": "How to Lay a Bet Builder",
                  "url": "https://betterbetgroup.com/guide-to-laying-accumulators#how-to-lay-a-bet-builder", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "3) Once you understand how bet builders work use our 'bet builder helper' below to choose your method."
              },
              {
                  "type": "button",
                  "content": "Bet Builder Helper",
                  "url": "https://betterbetgroup.com/bet-builder-helper", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit."
              },
              {
                  "type": "button",
                  "content": "Standard Calculator",
                  "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                  "style": "secondary"
                  },
  
                  {
                    "type": "text",
                    "content": "5) Once the 24 hours have passed, come back to this step and repeat the process with your other £5 bet builder free bet."
                  }
      
     
      
            ]
          }
        },
  
  
    
        {
          "id": 5,
          "title": "Accumulator Free Bets",
          "content": {
            "items": [
    
              {
                "type": "text",
                "content": "1) When your qualifying bet settles you will receive a £5 accumulator free bet, then 24 hours after you will receive a further £10 accumulator free bet."
              },
              {
                "type": "text",
                "content": "2) Both of these free bets must have 2+ football selections. Read the guide below to learn how to lay accumulator free bets and guarantee a profit using the Smarkets Acca Laying feature."
              },
              {
                  "type": "button",
                  "content": "How to Lay an Accumulator",
                  "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
                  "style": "secondary"
                  },
      
              {
                "type": "text",
                "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 2 good matches to use."
              },
              {
                  "type": "button",
                  "content": "Standard Oddsmatcher",
                  "url": "https://www.betterbetgroup.com/oddsmatcher", 
                  "style": "secondary"
                  },
                  {
                "type": "text",
                "content": "4) Then use our standard calculator in free bet mode to calculate your stake and profit once you have set up your bets on BetVictor and Smarkets."
              },
              {
                  "type": "button",
                  "content": "Standard Calculator",
                  "url": "https://www.betterbetgroup.com/matched-betting-calculator", 
                  "style": "secondary"
                  },
      
      
      
                  
      
            ]
          }
        },
  
  
  
  
  
        {
          "id": 6,
          "title": "Lucky Dip Free Bet",
          "content": {
            "items": [
    
              {
                "type": "text",
                "content": "1) Once your qualifying bet settles you will receive a £5 Lucky Dip free bet."
              },
              {
                "type": "text",
                "content": "2) The lucky dip free bet might be difficult to lay, therefore, since it's only £5 we recomend you punt it and just hope it wins."
              },
  
  
   
      
            ]
          }
        }
  
  
  ]
  
  }


// accumulator qualifying bet then IF LOSES get £20 free bet
let bwin_object = {

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
            "content": "2) Create an account with Bwin. Use the button below to automatically apply the promotion."
          },
          {
          "type": "button",
          "content": "Sign up to Bwin",
          "url": "https://www.bwin.com/en/engage/lan/pm/sports/bb_20", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Deposit £20 into your account using a debit card, you will need this for the qualifying bet."
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
          "content": "1) Navigate to the settings page on Bwin or click the button below."
        },
        {
          "type": "button",
          "content": "Bwin Settings",
          "url": "https://www.bwin.com/en/sports/settings/odds-display",
          "style": "secondary"
        },
        {
          "type": "text",
          "content": "2) Select EU(3.75) and remember to save your changes."
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
            "content": "1) For your qualifying bet you need to place a £20 accumulator bet with 3 selections and final odds of 3.00 or greater. If this qualifying bet loses, you will receive a £20 free bet. When laying accumulator bets, we recommend you use the Smarkets Acca Laying feature."
          },
          {
            "type": "text",
            "content": "2) Read the guide below to learn how to lay accumulator bets using the Smarkets Acca Laying feature."
          },
          {
              "type": "button",
              "content": "How to Lay an Accumulator",
              "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
              "style": "secondary"
              },
  
          {
            "type": "text",
            "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 3 good matches to use with combined odds of 3.00 or greater."
          },
          {
              "type": "button",
              "content": "Standard Oddsmatcher",
              "url": "https://www.betterbetgroup.com/oddsmatcher", 
              "style": "secondary"
              },
              {
            "type": "text",
            "content": "4) Since this is a refund offer, you should use our bonus calculator to calculate your stake and profit."
          },
          {
              "type": "button",
              "content": "Bonus Calculator",
              "url": "https://www.betterbetgroup.com/bonus-calculator", 
              "style": "secondary"
            },
  
            {
              "type": "text",
              "content": "5) It should be in 'Bonus applied if bet loses' mode, as well as 'Standard' lay and the free bet checkbox should be off. Then enter the back stake of £20 as well as your back and lay odds."
            },
  
            {
              "type": "text",
              "content": "6) Set the maximum bonus to £20 and set the bonus retention to 80% as this is what you expect to make from the free bet."
            },
  
            {
              "type": "text",
              "content": "7) The calculator will tell you the stake that you need to lay, then you should place the two bets before coming back to the calculator and clicking 'Log Bet'."
            },
  
            {
              "type": "text",
              "content": "8) If your accumulator bet on Bwin WINS then you have completed this offer and have probably made around £12 profit. If your accumulator bet on Bwin LOSES then you will have lost around £4 in this step but you will have received a £20 free bet which you can profit from in the next step."
            },
  
  
                  
      
            ]
          }
        },
  
    
  
  
  
    {
      "id": 4,
      "title": "Free Bets",
      "content": {
        "items": [
  
            {
              "type": "text",
              "content": "1) If your qualifying accumulator bet on Bwin loses, within 48 hours you will receive a £20 free bet which you can profit from in this step."
            },
            {
              "type": "info",
              "content": "This free bet must be used on football and expires after 7 days."
            },
            {
              "type": "text",
              "content": "2) Use the oddsmatcher below to find a suitable event for your free bet. This oddsmatcher automatically sorts the events by their profitability."
            },
  
            {
              "type": "text",
              "content": "3) Once this free bet settles you should have made around £12 profit overall."
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
          "Bwin"
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
  

// same as bwin, accumulator qualifying bet, then free bet if bet loses + free spins and uber eats voucher
let betway_object = {

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
                "content": "2) Instead of following a link you should find the site manually to make sure you qualify for the promotion. Go to google and search for 'betway'."
              },
              {
                  "type": "text",
                  "content": "3) Register an account and deposit £30 using a debit card, you will need this for the qualifying bet."
                },
                {
                  "type": "warning",
                  "content": "Deposits made using Revolut will not qualify."
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
          "content": "1) In the top right of the page click on 'Fractional'."
        },
        {
          "type": "text",
          "content": "2) Then select 'Decimal'."
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
            "content": "1) For your qualifying bet you need to place a £30 football accumulator bet with 3 selections and final odds of 3.00 or greater. If this qualifying bet loses, you will receive a £30 free bet. When laying accumulator bets, we recommend you use the Smarkets Acca Laying feature."
          },
          {
            "type": "text",
            "content": "2) Read the guide below to learn how to lay accumulator bets using the Smarkets Acca Laying feature."
          },
          {
              "type": "button",
              "content": "How to Lay an Accumulator",
              "url": "https://www.betterbetgroup.com/guide-to-laying-accumulators#laying-an-accumulator-on-smarkets", 
              "style": "secondary"
              },
  
          {
            "type": "text",
            "content": "3) Once you understand how to lay accumulators using Smarkets, use our standard oddsmatcher to find 3 good matches to use with combined odds of 3.00 or greater."
          },
          {
              "type": "button",
              "content": "Standard Oddsmatcher",
              "url": "https://www.betterbetgroup.com/oddsmatcher", 
              "style": "secondary"
              },
              {
            "type": "text",
            "content": "4) Since this is a refund offer, you should use our bonus calculator to calculate your stake and profit."
          },
          {
              "type": "button",
              "content": "Bonus Calculator",
              "url": "https://www.betterbetgroup.com/bonus-calculator", 
              "style": "secondary"
            },
  
            {
              "type": "text",
              "content": "5) It should be in 'Bonus applied if bet loses' mode, as well as 'Standard' lay and the free bet checkbox should be off. Then enter the back stake of £30 as well as your back and lay odds."
            },
  
            {
              "type": "text",
              "content": "6) Set the maximum bonus to £30 and set the bonus retention to 80% as this is what you expect to make from the free bet."
            },
  
            {
              "type": "text",
              "content": "7) The calculator will tell you the stake that you need to lay, then you should place the two bets before coming back to the calculator and clicking 'Log Bet'."
            },
  
            {
              "type": "text",
              "content": "8) If your accumulator bet on Betway WINS then you have completed this offer and have probably made around £16 profit. If your accumulator bet on Betway LOSES then you will have lost around £5 in this step but you will have received a £30 free bet which you can profit from in the next step."
            },
  
  
                  
      
            ]
          }
        },
  
    
  
  
  
    {
      "id": 4,
      "title": "Free Bet",
      "content": {
        "items": [
  
            {
              "type": "text",
              "content": "1) If your qualifying accumulator bet on Betway loses, within 1 hour you will receive a £30 free bet which you can profit from in this step."
            },
            {
              "type": "info",
              "content": "This free bet expires after 7 days."
            },
            {
              "type": "text",
              "content": "2) Use the oddsmatcher below to find a suitable event for your free bet. This oddsmatcher automatically sorts the events by their profitability."
            },
  
            {
              "type": "text",
              "content": "3) Once this free bet settles you should have made around £16 profit overall."
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
          "Betway"
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
    },
  
  
  
    {
          "id": 5,
          "title": "Free Spins",
          "content": {
            "items": [
              {
                "type": "info",
                "content": "You will also receive 100 free spins to use on the 'More Unusual Suspects' slot."
              },
            {
              "type": "text",
              "content": "1) Use the free spins on the 'More Unusual Suspects' slot, the winnings are credited as cash."
            },
      
      
            ]
          }
        },
  
  
  
        {
          "id": 6,
          "title": "Uber Eats Voucher",
          "content": {
            "items": [
              {
                "type": "text",
                "content": "1) Betway might also send you a £30 Uber Eats voucher via email. You cannot lay this."
              },
  
      
      
            ]
          }
        }
  
  
  
  
  
  
  
  ]
  
  }
  
  
// 100% profit boost token for first £10 bet, then £30 casino bonus
let grosvenor_object = {

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
            "content": "2) Create an account with Grosvenor. Use the button below and select the casino welcome bonus."
          },
          {
          "type": "button",
          "content": "Sign up to Grosvenor",
          "url": "https://promo.Grosvenor.co.uk/gb/affiliates-sports", 
          "style": "primary"
          },
          {
            "type": "text",
            "content": "3) Deposit £20 into your account using a debit card and you will be immediately credited with a £30 casino bonus, but we're going to come back to this later."
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
          "content": "1) Scroll to the bottom of the page on Grosvenor."
        },
        {
          "type": "text",
          "content": "2) Click on 'Settings'."
        },
        {
          "type": "text",
          "content": "3) Under 'Odds format', select 'Decimal'."
        },
  
        ]
      }
    },
    {
      "id": 3,
      "title": "Profit Boost",
      "content": {
        "items": [
          {
              "type": "text",
              "content": "1) This offer gives you a 100% profit boost token for your first £10 bet, this should appear when you add a selection to your betslip."
            },
            {
              "type": "text",
              "content": "2) Use our oddsmatcher below to find a suitable event."
            },
            {
              "type": "text",
              "content": "3) When you click on the oddsmatcher dropdown, you must manually type in the new enhanced back odds. This should simply be double the original back odds."
            },
            {
              "type": "text",
              "content": "4) You should then have a revised lay stake and profit due to the profit boost. Place your bets and log the bet to your profit tracker. Your profit from this boost should be around £7.50."
            },
            {
              "type": "text",
              "content": "5) You deposited £20 to qualify for the casino bonus but only used £10 on this step, meaning you should have a balance left over in your Grosvenor account. Please withdraw your main balance before doing the next step which is your £30 casino bonus."
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
                    "Grosvenor"
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
              "isfree": false,
              "laytype": "Standard"
            }
          }
  
  
      }
    },
  
  
  
  
  
  
  
    
    {
            "id": 4,
            "title": "Casino Bonus",
            "content": {
              "items": [
  
              {
                  "type": "warning",
                  "content": "MAKE SURE YOU HAVE £0 IN YOUR MAIN BALANCE BEFORE YOU START SPINNING, OTHERWISE IT MAY GO INTO YOUR MAIN BALANCE."
                },
      
                {
                  "type": "text",
                  "content": "1) After depositing £20 you will have immediately received a £30 casino bonus. Go to the casino section on Grosvenor and load up the eligible slots or click the button below."
                },
                {
                  "type": "button",
                  "content": "Grosvenor Eligible Slots",
                  "url": "https://www.grosvenorcasinos.com/games-selection-bonus-wager",
                  "style": "secondary"
                },
                {
                  "type": "text",
                  "content": "2) Choose a high RTP slot and keep wagering £2 until you have completed the minimum wagering requirement of £1,500 or until you have lost the bonus."
                },
                {
                  "type": "text",
                  "content": "3) Once you complete the £1,500 wagering requirement it will turn to withdrawable cash."
                }
    
     
        
              ]
            }
          }
    
  
  
  
  
  ]
  
  }


// 5 qualifying bets, regularish free bets
let bet600_object = {

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
            "content": "2) Create an account with Bet600. Use the button below to automatically apply the promotion."
          },
          {
          "type": "button",
          "content": "Sign up to Bet600",
          "url": "https://www.bet600.co.uk/en/promotions/welcomeoffer", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £50 into your account using a debit card, you will need this for the qualifying bets."
            },
            {
              "type": "info",
              "content": "The whole offer must be completed within one week of registering, so make sure you are ready when you sign up."
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
          "content": "1) Go to the 'Sports Settings' section of Bet600 or click the button below."
        },
        {
          "type": "button",
          "content": "Bet600 More Section",
          "url": "https://www.bet600.co.uk/en/sport/settings", 
          "style": "secondary"
        },
        {
          "type": "text",
          "content": "2) Select EU(3.75) under 'Odds Format' and then save your changes."
        },
  
  
  
  
        ]
      }
    },
    {
      "id": 3,
      "title": "Qualifying Bets",
      "content": {
        "items": [
          {
              "type": "text",
              "content": "1) To unlock your free bets, you first need to place 5 X £10 bets on Bet600 at odds of 2.00 or greater within one week of registering. You can use the oddsmatcher below to find suitable events."
            },
  
  
          {
            "type": "warning",
            "content": "Your bets must be at least 2.00 odds and they must all be on different events."
          },
            {
            "type": "text",
            "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on Bet600 as well as placing a lay bet on the same event on Smarkets."
          },
          {
            "type": "text",
            "content": "3) Repeat this process until you have placed all 5 X £10 qualifying bets."
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
          "Bet600"
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
      "title": "Free Bet",
      "content": {
        "items": [
          {
              "type": "info",
              "content": "8 days after registering your account, you will receive a £10 free bet which must be used at odds of 7.0 or lower."
            },
            {
              "type": "text",
              "content": "1) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability and only includes events with odds of 7.0 or lower."
            },  
            {
              "type": "warning",
              "content": "Bear in mind that the free bets are only valid for 7 days, so you must use them within this time."
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
          "Bet600"
      ],
      "exchanges": [
          "Smarkets"
      ],
      "startTime": "",
      "minLiquidity": null,
      "minBackOdds": null,
      "maxBackOdds": 7,
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
      "title": "More Free Bets",
      "content": {
        "items": [
          {
              "type": "text",
              "content": "1) You can actually keep doing this every week. Just repeat the same process again placing 5 X £10 bets within the week and you will receive the free bet. However, once you miss a week, you will not be able to take part anymore."
            },
  
  
  
        ],
  
      }
    }
  
  
  
  
  
  
  
  
  
  
  
  ]
  
  }
  

  // normal
let copybet_object = {

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
            "content": "2) Create an account with CopyBet using a mobile device using their mobile app. Opt in to the offer in your profile section."
          },
          {
              "type": "warning",
              "content": "You must sign up using their mobile app to qualify for this promotion."
            },
          {
          "type": "button",
          "content": "Sign up to CopyBet",
          "url": "https://sports.williamhill.com/betting/en-gb/apps/promotions/offer/r30", 
          "style": "primary"
          },
          {
              "type": "text",
              "content": "3) Once registered, deposit £20 into your account using your banking app, a normal debit card deposit will not qualify."
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
          "content": "1) Click on the settings icon in the top right of the page."
        },
        {
          "type": "text",
          "content": "2) In the 'Odds format' dropdown, select 'Decimal'."
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
              "content": "1) To unlock your free bet, you first need to place a £20 qualifying back bet on CopyBet within 7 days of registering. You can use the oddsmatcher below to find a suitable event."
            },
            {
            "type": "warning",
            "content": "This bet must have odds of 1.90 or greater (the oddsmatcher automatically filters out events below 1.90)."
          },
  
            {
            "type": "text",
            "content": "2) Simply follow the instructions in the oddsmatcher dropdown, placing a back bet on CopyBet as well as placing a lay bet on the same event on Smarkets."
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
          "CopyBet"
      ],
      "exchanges": [
          "Smarkets"
      ],
      "startTime": "",
      "minLiquidity": null,
      "minBackOdds": 1.9,
      "maxBackOdds": null,
      "minRating": null,
      "maxRating": null,
      "minQualifyingLoss": null,
      "minPotentialProfit": null
  },
          "tutorial_info": {
            "current_sort": "qualifying loss",
            "profit_header_text": "Qualifying<br>Loss",
            "stake": "20",
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
              "content": "Within 24 hours of your qualifying bet settling, you will receive a £20 free bet from CopyBet."
            },
            {
              "type": "warning",
              "content": "Bear in mind that the free bets are only valid for 7 days, so you must use them within this time."
            },
            {
              "type": "text",
              "content": "1) Use the oddsmatcher below to find a suitable event. This oddsmatcher automatically sorts the events by their profitability."
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
          "CopyBet"
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
  


// qualifying bet, larger free bet if it loses + casino bonus
let fafabet_object = {

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
                "content": "2) Sign up to FafaBet using the button below."
              },
              {
                "type": "button",
                "content": "Sign up to FafaBet",
                "url": "https://www.fafabet.co.uk/promotions/welcomeoffer/",
                "style": "primary"
              },
  
  
              {
                  "type": "text",
                  "content": "3) Once registered, deposit £100 using a debit card, you will need this for the qualifying bet."
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
          "content": "1) Scroll to the bottom of the page."
        },
        {
          "type": "text",
          "content": "2) On the left side click on 'FRACTIONAL' and it will change to 'DECIMAL'."
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
                "type": "info",
                "content": "Your qualifying bet is a £100 bet placed at odds of 2.0 or greater. If it wins, you receive a £20 free bet. If it loses, you receive a £50 free bet. To profit from this offer you should use the bonus calculator - which uses a different calculation to the standard calculator."
              },
              {
                "type": "text",
                "content": "1) First you should head over to the standard oddsmatcher page and filter for the bookmaker 'FafaBet' and minimum odds of 2.0."
              },
              {
                "type": "button",
                "content": "Standard Oddsmatcher",
                "url": "https://www.betterbetgroup.com/oddsmatcher", 
                "style": "secondary"
              },
            {
              "type": "text",
              "content": "2) Choose an event but don't complete the bet in the oddsmatcher, instead take the values and head over to the bonus calculator linked below."
            },
            {
              "type": "button",
              "content": "Bonus Calculator",
              "url": "https://www.betterbetgroup.com/bonus-calculator", 
              "style": "secondary"
            },
            {
              "type": "text",
              "content": "3) It should be in 'Bonus applied if bet loses' mode, as well as 'Standard' lay and the free bet checkbox should be off."
            },
            {
              "type": "text",
              "content": "4) Enter the back stake of £100. Enter the FafaBet back odds from the oddsmatcher as well as the lay odds."
            },
            {
              "type": "text",
              "content": "5) Set the maximum bonus to £50 and set the bonus retention to 80% as this is what you expect to make from the free bet."
            },
            {
              "type": "text",
              "content": "6) The calculator will tell you the stake that you need to lay, then you should place the two bets before coming back to the calculator and clicking 'Log Bet'."
            },
            {
              "type": "text",
              "content": "7) If your bet on FafaBet wins then you will have already made a profit and you will also have a £20 free bet. However if your bet on FafaBet loses then you should have made a small qualifying loss on this step but you will have gained a £50 free bet."
            },
    
    
            
          ],
    
        }
      },
    
    
    
    
      {
            "id": 4,
            "title": "Free Bet",
            "content": {
              "items": [
        
                  {
                    "type": "info",
                    "content": "Depending on if your bet on FafaBet loses or wins, you have either have a £20 free bet or a £50 free bet. You also have a casino bonus to profit from in the next step."
                  },
                  {
                    "type": "text",
                    "content": "1) Once your qualifying bet has settled, you will receive your free bet."
                  },
                  {
                    "type": "text",
                    "content": "2) Use the oddsmatcher below to find a suitable event for your free bet. This oddsmatcher automatically sorts the events by their profitability."
                  },
  
                  {
                    "type": "text",
                    "content": "3) The oddsmatcher is automatically setting the free bet stake to £20, but if you got the £50 free bet just type in 50 for the back stake in the oddsmatcher dropdown."
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
                "FafaBet"
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
          },
  
  
  
      
      {
              "id": 5,
              "title": "Casino Bonus",
              "content": {
                "items": [
    
                {
                    "type": "warning",
                    "content": "MAKE SURE YOU HAVE £0 IN YOUR MAIN BALANCE BEFORE YOU START SPINNING, OTHERWISE IT MAY GO INTO YOUR MAIN BALANCE."
                  },
        
                  {
                    "type": "text",
                    "content": "1) The day after your qualifying bet settles you will also receive a casino bonus. This is £20 if the qualifying bet loses and £10 if the qualifying bet wins. This bonus expires after 48 hours and must be wagered 35 times."
                  },
                  {
                    "type": "text",
                    "content": "2) Since you must wager it 35 times (£700 or £350) choose a high RTP slot and keep wagering £1-£2 until you have completed the minimum wagering requirement or until you have lost the bonus."
                  },
  
                  {
                    "type": "info",
                    "content": "The maximum you can make from this bonus is £100."
                  }
  
      
       
          
                ]
              }
            }
      
    
      
    
  
  
  ]
  
  }
  
