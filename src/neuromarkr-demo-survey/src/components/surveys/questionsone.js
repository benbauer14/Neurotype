const json = {
    title: "NeuromarkR Survey",
    pages: [
     {
      name: "CQL",
      elements: [
       {
        type: "radiogroup",
        name: "hrqol_01",
        title: "Would you say that in general your health is:",
        choices: [
         {
          value: "0",
          text: "Excellent"
         },
         {
          value: "1",
          text: "Very much good"
         },
         {
          value: "2",
          text: "Good"
         },
         {
          value: "3",
          text: "Fair"
         },
         {
          value: "4",
          text: "Poor"
         },
         {
          value: "5",
          text: "Not sure"
         },
         {
          value: 6,
          text: "Refuse"
         }
        ]
       },
       {
        type: "text",
        name: "hrqol_02",
        title: "Thinking about your physical health, which includes physical illness and injury, for how many days during the past ___ days was your physical health not good?"
       },
       {
        type: "text",
        name: "hrqol_03",
        title: "Thinking about your mental health, which includes stress, depression, and problems with emotions, for how many days during the past ___ days was your mental health not good?"
       },
       {
        type: "text",
        name: "hrqol_04",
        title: "During the past ___ days, for about how many days did poor physical OR mental health keep you from doing your usual activities, such as self-care, work, or recreation?"
       },
       {
        type: "text",
        name: "BAM_02",
        title: "In the past ___ days, how many nights did you have trouble falling asleep or staying asleep?"
       },
       {
        type: "text",
        name: "BAM_03",
        title: "In the past ___ days, about how many days have you felt depressed, anxious, angry, or very upset throughout most of the day?"
       },
       {
        type: "text",
        name: "BAM_04",
        title: "In the past ___ days, about how many days have you drank any alcohol?"
       },
       {
        type: "text",
        name: "FTND_Skip",
        title: "In the past ___ days, about how many days have you smoked any cigarettes?"
       },
       {
        type: "text",
        name: "BAM_06",
        title: "In the past ___ days, about how many days did you use any illegal/street drugs or abuse any prescription medication?"
       }
      ],
      title: "Current Quality of Life",
      description: "In the below questions pertain to the past 30 DAYS if the participant has not participated in more than 30 days, or 7 DAYS if the participant has participated within fewer than 30 days. "
     },
     {
      name: "TSS",
      elements: [
       {
        type: "radiogroup",
        name: "TSS_02",
        title: "In the past ___ days, have you been to see a professional such as a psychiatrist, counselor, or therapist, or have you been in the hospital for help with problems related to alcohol and/or drugs?",
        choices: [
         {
          value: "0",
          text: "No"
         },
         {
          value: "1",
          text: "Yes"
         }
        ]
       },
       {
        type: "matrixdropdown",
        name: "TSS_02-a",
        title: "What types of health services have you received?",
        columns: [
         {
          name: "notes",
          title: "Please describe"
         },
         {
          name: "weeks",
          title: "# of weeks"
         },
         {
          name: "agefirst",
          title: "age 1st time"
         },
         {
          name: "agelast",
          title: "age last time"
         },
         {
          name: "currently",
          title: "currently in Tx?",
          cellType: "boolean"
         }
        ],
        choices: [
         1,
         2,
         3,
         4,
         5
        ],
        cellType: "text",
        rows: [
         {
          value: "emergency",
          text: "Emergency care (e.g., ER) related to substance abuse"
         },
         {
          value: "inpatient",
          text: "Inpatient substance abuse treatment"
         },
         {
          value: "outpatient",
          text: "Outpatient substance abuse treatment"
         },
         {
          value: "extendedaftercare",
          text: "Extended drug treatment aftercare"
         },
         {
          value: "sponsoredaftercare",
          text: "Aftercare sponsored by a treatment facility"
         },
         {
          value: "alanon",
          text: "Al-Anon/Alateen"
         },
         {
          value: "alumni",
          text: "Alumni group"
         },
         {
          value: "school",
          text: "School support group"
         },
         {
          value: "individual",
          text: "Individual counseling"
         },
         {
          value: "family",
          text: "Family counseling"
         },
         {
          value: "mindfulness",
          text: "Mindfulness/meditation-based therapy"
         },
         {
          value: "digital",
          text: "Digital/mobile-based therapy"
         },
         {
          value: "other",
          text: "Other"
         }
        ]
       },
       {
        type: "matrixdropdown",
        name: "TSS_02-d",
        title: "Have you been prescribed any of the following medications to help manage symptoms of alcohol and/or drug use?",
        columns: [
         {
          name: "weeks",
          title: "# of weeks"
         },
         {
          name: "agefirst",
          title: "age 1st time"
         },
         {
          name: "agelast",
          title: "age last time"
         },
         {
          name: "currently",
          title: "currently in Tx?",
          cellType: "boolean"
         }
        ],
        choices: [
         1,
         2,
         3,
         4,
         5
        ],
        cellType: "text",
        rows: [
         {
          value: "methadone",
          text: "Methadone (e.g., Dolophone, Methadose, etc.)"
         },
         {
          value: "buprenorphine",
          text: "Buprenorphine (e.g., Suboxone, Subutex, Buvidal, Cizdol, Brixadi, Zubsolv, Bunavail, Buvidal, Sublocade, Probuphine, Temgesic, Buprenex, Norspan, Butrans, etc.)"
         },
         {
          value: "naltrexone",
          text: "Naltrexone (e.g., ReVia, Vivitrol, Depade, etc.)"
         },
         {
          value: "disulfiram",
          text: "Disulfiram (e.g., Antabuse, Antabus, etc.)"
         },
         {
          value: "acamprosate",
          text: "Acamprosate (e.g., Campral, etc.)"
         },
         {
          value: "buproprion",
          text: "Buproprion (e.g., Wellbutrin, Zyban, etc.)"
         },
         {
          value: "varenicline",
          text: "Varenicline (e.g., Chantix, Champix, etc.)"
         }
        ]
       }
      ],
      title: "Treatment Services Summary",
      description: "In the below questions pertain to the past 30 DAYS if the participant has not participated in more than 30 days, or 7 DAYS if the participant has participated within fewer than 30 days. "
     },
     {
      name: "OPD",
      elements: [
       {
        type: "rating",
        name: "OCS_01",
        title: "How much do you currently (at this moment) desire, crave, or want to use opioids?",
        description: "1=Not at all, 10=Extremely.",
        rateMax: 10
       },
       {
        type: "rating",
        name: "OCS_02",
        title: "In the past week, please rate how strong you desire, crave, or want to use opioids has been when something in the environment has reminded you of opioids?",
        description: "1=No desire, 10=Extremely strong desire.",
        rateMax: 10
       },
       {
        type: "rating",
        name: "POCS_05",
        title: "In the past week, please rate how strong your OVERALL opioid desire, craving, or wanting has been.",
        description: "1=No desire,\n10= Extremely strong desire.",
        rateMax: 10
       },
       {
        type: "rating",
        name: "OCS_03",
        title: "Please imagine yourself in the environment where you previously used opioids. If you were in this environment and if it was the time of day you typically used opioids, what is the likelihood that you would use opioids today?",
        description: "1=Not at all, 10=I'm sure I would use opioids.",
        rateMax: 10
       },
       {
        type: "rating",
        name: "GSE_01",
        title: "How confident are you that you will be completely abstinent from opioids 30 days from now?",
        description: "1=Not at all confident,\n10=Extremely confident.",
        rateMax: 10
       }
      ],
      title: "Opioid Craving Questionnaires"
     },
     {
      name: "FCQs",
      elements: [
       {
        type: "matrix",
        name: "FCQs_ALL",
        title: "Please indicate the extent to which you agree with each statement right now, at this very moment:",
        columns: [
         {
          value: "0",
          text: "Strongly disagree"
         },
         {
          value: "1",
          text: " "
         },
         {
          value: "2",
          text: "Neither agree nor disagree"
         },
         {
          value: "3",
          text: " "
         },
         {
          value: "4",
          text: "Strongly agree"
         }
        ],
        rows: [
         {
          value: "craving",
          text: "I have an intense desire, craving, or urge to eat a favorite food of mine."
         },
         {
          value: "rewardanticipation",
          text: "Eating a favorite food of mine would make me feel wonderful."
         },
         {
          value: "reliefanticipation",
          text: "If I ate something, I would not feel so sluggish, grouchy, or irritable."
         },
         {
          value: "uncontrol",
          text: "If I had a favorite food, I could not stop eating it."
         },
         {
          value: "hungry",
          text: "I feel weak, hungry, or that my stomach is empty, and eating right now would help."
         }
        ]
       }
      ],
      title: "Food Cravings Questionnaire"
     },
     {
      name: "PHQ9",
      elements: [
       {
        type: "matrix",
        name: "PHQ9_ALL",
        title: "Over the last ___ days, how often have you been bothered by any of the following problems?",
        columns: [
         {
          value: "0",
          text: "Not at all"
         },
         {
          value: "1",
          text: "Several days"
         },
         {
          value: "2",
          text: "More than half the days"
         },
         {
          value: "3",
          text: "Nearly every day"
         }
        ],
        rows: [
         {
          value: "pleasure",
          text: "Little interest or pleasure in doing things"
         },
         {
          value: "depressed",
          text: "Feeling down, depressed, or hopeless"
         },
         {
          value: "sleep",
          text: "Trouble falling or staying asleep, or sleeping too much"
         },
         {
          value: "tired",
          text: "Feeling tired or having little energy"
         },
         {
          value: "appetite",
          text: "Poor appetite or overeating"
         },
         {
          value: "failure",
          text: "Feeling bad about yourself - or that you are a failure or have let yourself or family down"
         },
         {
          value: "concentration",
          text: "Trouble concentrating on things, such as reading the news or watching television"
         },
         {
          value: "psychomotor",
          text: "Moving or speaking so slowly that other people could have noticed. Or the opposite, being so fidgety or restless that you have been moving around a lot more than usual"
         },
         {
          value: "suicide",
          text: "Thoughts that you would be better off dead, or of hurting yourself"
         }
        ]
       }
      ],
      title: "Patient Health Questionnaire",
      description: "In the below questions pertain to the past 30 DAYS if the participant has not participated in more than 30 days, or 7 DAYS if the participant has participated within fewer than 30 days. "
     }
    ]
   };

   export default json;