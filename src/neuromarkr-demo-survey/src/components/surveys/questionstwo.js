const json = {
    name: "ALC",
    elements: [
     {
      type: "radiogroup",
      name: "AUDIT_02",
      title: "During a typical day when you are drinking, how many drinks containing alcohol do you have?",
      choices: [
       {
        value: "0",
        text: "1 or 2 drinks"
       },
       {
        value: "1",
        text: "3 or 4 drinks"
       },
       {
        value: "2",
        text: "5 or 6 drinks"
       },
       {
        value: "3",
        text: "7 to 9 drinks"
       },
       {
        value: "4",
        text: "10 or more drinks"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "ASI_D1-route",
      title: "During a typical day when you are drinking, which type of alcoholic beverage do you drink or prefer most?",
      choices: [
       {
        value: "beer",
        text: "Beer (e.g., ale, lager, pilsner, etc.)"
       },
       {
        value: "wine",
        text: "Wine (e.g., red wine, white wine, etc.)"
       },
       {
        value: "liquor",
        text: "Liquor (e.g., distilled spirits, vodka, gin, whiskey, etc.)"
       }
      ],
      hasOther: true,
      otherText: "Other such as malt beverage, alcoholic seltzers, cider, etc. (please describe)"
     },
     {
      type: "radiogroup",
      name: "BAM_05",
      title: "During a typical month when you are drinking, how many days do you have at least 5 drinks?",
      choices: [
       {
        value: "0",
        text: "0 days"
       },
       {
        value: "1",
        text: "1-3 days"
       },
       {
        value: "2",
        text: "4-8 days"
       },
       {
        value: "3",
        text: "9-15 days"
       },
       {
        value: "4",
        text: "16-30 days"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "AUDIT_04",
      title: "In the past year, how often have you found that you were not able to stop drinking once you had started?",
      choices: [
       {
        value: "0",
        text: "Never"
       },
       {
        value: "1",
        text: "Less than monthly"
       },
       {
        value: "2",
        text: "Monthly"
       },
       {
        value: "3",
        text: "Weekly"
       },
       {
        value: "4",
        text: "Daily or almost daily"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "AUDIT_05",
      title: "In the past year, how often have you failed to do what was normally expected of you because of drinking?",
      choices: [
       {
        value: "0",
        text: "Never"
       },
       {
        value: "1",
        text: "Less than monthly"
       },
       {
        value: "2",
        text: "Monthly"
       },
       {
        value: "3",
        text: "Weekly"
       },
       {
        value: "4",
        text: "Daily or almost daily"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "AUDIT_06",
      title: "In the past year, how often have you needed a first drink in the morning to get yourself going after a heavy drinking session?",
      choices: [
       {
        value: "0",
        text: "Never"
       },
       {
        value: "1",
        text: "Less than monthly"
       },
       {
        value: "2",
        text: "Monthly"
       },
       {
        value: "3",
        text: "Weekly"
       },
       {
        value: "4",
        text: "Daily or almost daily"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "AUDIT_07",
      title: "In the past year, how often have you had a feeling of guilt or remorse after drinking?",
      choices: [
       {
        value: "0",
        text: "Never"
       },
       {
        value: "1",
        text: "Less than monthly"
       },
       {
        value: "2",
        text: "Monthly"
       },
       {
        value: "3",
        text: "Weekly"
       },
       {
        value: "4",
        text: "Daily or almost daily"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "AUDIT_08",
      title: "In the past year, how often have you been unable to remember what happened the night before because of your drinking?",
      choices: [
       {
        value: "0",
        text: "Never"
       },
       {
        value: "1",
        text: "Less than monthly"
       },
       {
        value: "2",
        text: "Monthly"
       },
       {
        value: "3",
        text: "Weekly"
       },
       {
        value: "4",
        text: "Daily or almost daily"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "AUDIT_09",
      title: "Have you or someone else been injured because of your drinking?",
      choices: [
       {
        value: "0",
        text: "No"
       },
       {
        value: "1",
        text: "Yes, but not in the last year"
       },
       {
        value: "2",
        text: "Yes, during the last year"
       }
      ]
     },
     {
      type: "radiogroup",
      name: "AUDIT_10",
      title: "Has a relative, friend, doctor, or other health care worker been concerned about your drinking or suggested you cut down? ",
      choices: [
       {
        value: "0",
        text: "No"
       },
       {
        value: "1",
        text: "Yes, but not in the last year"
       },
       {
        value: "2",
        text: "Yes, during the last year"
       }
      ]
     }
    ],
    visibleIf: "{BAM_04} > 0",
    title: "Alcohol",
    description: "Please note that below, \"ONE DRINK\" is considered one shot of hard liquor (1.5 ounces), one 12-ounce beer, or one 5 ounce glass of wine."
   };

export default json;