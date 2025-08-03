

let skybet_object = {

    "steps": [
      {
        "id": 1,
        "title": "Account Setup",
        "content": {
          "items": [
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
                "content": "1) To unlock your free bets, you first need to place a £5 qualifying back bet on Skybet."
              },
              {
                "type": "info",
                "content": "The minimum required stake is actually 5p, but you should use £5 in order to mimic a real customer."
              },
            {
              "type": "text",
              "content": "2) Use the oddsmatcher below to find a suitable event. Once your bet has settled, you should receive £30 in free bets, which you can profit from in the next step."
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
                "content": "Once your qualifying bet settles, Skybet will credit your account with 3 X £10 free bets. This usually happens within 10 hours of your qualifying bet settling."
              },
              {
                "type": "text",
                "content": "1) Once the free bets arrive, you should use all three at once on the same selection. This way, you only need to place one lay bet. However, if you prefer, you can do them one at a time by changing the stake to £10 in the oddsmatcher dropdown."
              },
              {
                "type": "text",
                "content": "2) Use the Oddsmatcher below to find a suitable event, this oddsmatcher automatically sorts the events by their profitablitity."
              },
              {
                "type": "warning",
                "content": "Higher odds mean higher liability. You'll need to deposit more into Smarkets to cover the lay side."
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
    


let coral_object = {}