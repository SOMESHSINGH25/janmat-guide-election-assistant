export const chatbotData = {
  en: {
    ui: {
      title: "Ask the Demo Assistant",
      subtitle: "Have specific questions about your rights, polling booths, or documentation? Ask our AI assistant for instant, beginner-friendly explanations.",
      disclaimer: "Note: Currently using demo responses. Gemini AI integration will be added in the next phase.",
      placeholder: "Type your question here... (e.g. 'What is EVM?')",
      onlineStatus: "Online (Demo)",
      botName: "Demo Assistant",
      features: [
        "Find registration steps",
        "Know important dates",
        "Understand your rights"
      ]
    },
    messages: {
      greeting: "Namaste! I am your Janmat Demo Assistant. How can I help you with the election process today?",
      outOfScope: "I’m Janmat Guide, and I can only help with election process and voter education topics. Please ask me something related to voting, elections, voter registration, EVM/VVPAT, or the election timeline.",
      fallback: "I'm not sure I understand. Could you try asking about voter registration, EVM, NOTA, or polling booths?",
      topics: {
        registration: "To register to vote, you need to be an Indian citizen of 18 years or older. You can fill out Form 6 online at the NVSP (National Voters' Service Portal) or submit it to your Electoral Registration Officer.",
        evm: "EVM stands for Electronic Voting Machine. It consists of a Control Unit and a Ballot Unit. You simply press the blue button next to your chosen candidate's symbol.",
        vvpat: "VVPAT (Voter Verified Paper Audit Trail) is a machine attached to the EVM. It prints a paper slip with your chosen candidate's symbol, visible for 7 seconds, so you can verify your vote.",
        mcc: "The Model Code of Conduct (MCC) is a set of guidelines by the Election Commission. It ensures free and fair elections by preventing the ruling party from misusing government machinery.",
        booth: "A polling booth is where you go to cast your vote. You can find your designated booth online on the ECI website using your EPIC number.",
        nota: "NOTA (None Of The Above) is the last button on the EVM. It allows you to officially register your disapproval of all the candidates contesting in your constituency.",
        counting: "Votes are counted in secure centers under CCTV surveillance. EVM seals are checked in front of candidate representatives before the votes are tallied round-by-round.",
        first_time: "Welcome, first-time voter! Make sure you are registered (Form 6). On voting day, bring your Voter ID (EPIC), stand in line, get your finger inked, and press the EVM button confidently!",
        documents: "To vote, you must be on the voter list. You should carry your Voter ID (EPIC). If you don't have it, you can use Aadhaar, PAN card, Driving License, Passport, or other ECI-approved photo IDs.",
        results: "Election results are declared by the Returning Officer after the counting process is complete. The candidate with the highest number of votes wins."
      }
    }
  },
  hi: {
    ui: {
      title: "डेमो सहायक से पूछें",
      subtitle: "क्या आपके पास अपने अधिकारों, मतदान केंद्रों या दस्तावेजों के बारे में विशिष्ट प्रश्न हैं? तत्काल स्पष्टीकरण के लिए हमारे एआई सहायक से पूछें।",
      disclaimer: "नोट: वर्तमान में डेमो प्रतिक्रियाओं का उपयोग किया जा रहा है। जेमिनी एआई एकीकरण अगले चरण में जोड़ा जाएगा।",
      placeholder: "अपना प्रश्न यहाँ टाइप करें... (जैसे 'EVM क्या है?')",
      onlineStatus: "ऑनलाइन (डेमो)",
      botName: "डेमो सहायक",
      features: [
        "पंजीकरण के चरण खोजें",
        "महत्वपूर्ण तिथियां जानें",
        "अपने अधिकारों को समझें"
      ]
    },
    messages: {
      greeting: "नमस्ते! मैं आपका जनमत डेमो सहायक हूँ। आज चुनाव प्रक्रिया को समझने में मैं आपकी कैसे मदद कर सकता हूँ?",
      outOfScope: "मैं जनमत गाइड हूँ, और मैं केवल चुनाव प्रक्रिया और मतदाता शिक्षा विषयों पर मदद कर सकता हूँ। कृपया मुझसे मतदान, चुनाव, मतदाता पंजीकरण, EVM/VVPAT, या चुनाव समयरेखा से संबंधित कुछ पूछें।",
      fallback: "मुझे यकीन नहीं है कि मैं समझा। क्या आप मतदाता पंजीकरण, EVM, NOTA, या मतदान केंद्रों के बारे में पूछने का प्रयास कर सकते हैं?",
      topics: {
        registration: "वोट देने के लिए पंजीकरण करने हेतु आपको 18 वर्ष या उससे अधिक आयु का भारतीय नागरिक होना चाहिए। आप NVSP पोर्टल पर ऑनलाइन फॉर्म 6 भर सकते हैं।",
        evm: "EVM का अर्थ है इलेक्ट्रॉनिक वोटिंग मशीन। इसमें एक कंट्रोल यूनिट और एक बैलेट यूनिट होती है। आपको बस अपनी पसंद के उम्मीदवार के चुनाव चिह्न के आगे का नीला बटन दबाना होता है।",
        vvpat: "VVPAT एक मशीन है जो EVM से जुड़ी होती है। यह आपके द्वारा चुने गए उम्मीदवार के चुनाव चिह्न वाली एक कागज़ की पर्ची छापती है, जो 7 सेकंड तक दिखाई देती है ताकि आप अपने वोट को सत्यापित कर सकें।",
        mcc: "आदर्श आचार संहिता (MCC) चुनाव आयोग द्वारा दिशानिर्देशों का एक सेट है। यह स्वतंत्र और निष्पक्ष चुनाव सुनिश्चित करता है।",
        booth: "मतदान केंद्र वह जगह है जहाँ आप अपना वोट डालने जाते हैं। आप अपने EPIC नंबर का उपयोग करके ECI वेबसाइट पर अपने नामित बूथ को ऑनलाइन पा सकते हैं।",
        nota: "NOTA (इनमें से कोई नहीं) EVM पर अंतिम बटन है। यह आपको अपने निर्वाचन क्षेत्र के सभी उम्मीदवारों की आधिकारिक तौर पर अस्वीकृति दर्ज करने की अनुमति देता है।",
        counting: "वोटों की गिनती सीसीटीवी निगरानी में सुरक्षित केंद्रों में की जाती है। वोटों की गिनती से पहले उम्मीदवारों के प्रतिनिधियों के सामने ईवीएम की सील की जांच की जाती है।",
        first_time: "पहली बार मतदान करने वाले मतदाता, आपका स्वागत है! सुनिश्चित करें कि आप पंजीकृत हैं (फॉर्म 6)। मतदान के दिन, अपना वोटर आईडी लाएं, स्याही लगवाएं और ईवीएम बटन दबाएं!",
        documents: "वोट देने के लिए आपका नाम मतदाता सूची में होना चाहिए। आपको अपना वोटर आईडी (EPIC) ले जाना चाहिए। इसके न होने पर आप आधार, पैन कार्ड, ड्राइविंग लाइसेंस, पासपोर्ट का उपयोग कर सकते हैं।",
        results: "मतगणना प्रक्रिया पूरी होने के बाद रिटर्निंग ऑफिसर द्वारा चुनाव परिणामों की घोषणा की जाती है। सबसे अधिक वोट पाने वाला उम्मीदवार जीतता है।"
      }
    }
  },
  hinglish: {
    ui: {
      title: "Demo Assistant Se Poochhein",
      subtitle: "Kya aapke paas rights, polling booths, ya documents ke baare mein questions hain? Hamare AI assistant se poochhein.",
      disclaimer: "Note: Abhi demo responses use ho rahe hain. Gemini AI integration next phase mein add kiya jayega.",
      placeholder: "Apna question yahan type karein... (e.g. 'EVM kya hai?')",
      onlineStatus: "Online (Demo)",
      botName: "Demo Assistant",
      features: [
        "Registration steps jaanein",
        "Important dates jaanein",
        "Apne rights samjhein"
      ]
    },
    messages: {
      greeting: "Namaste! Main aapka Janmat Demo Assistant hoon. Aaj election process samajhne mein main aapki kaise madad kar sakta hoon?",
      outOfScope: "Main Janmat Guide hoon, aur main sirf election process aur voter education topics par help kar sakta hoon. Please mujhse voting, elections, voter registration, EVM/VVPAT, ya election timeline se related kuch poochhein.",
      fallback: "Main samjha nahi. Kya aap voter registration, EVM, NOTA, ya polling booths ke baare mein poochh sakte hain?",
      topics: {
        registration: "Vote dalne ke liye aapko 18 saal ya usse upar ka Indian citizen hona chahiye. Aap NVSP portal par online Form 6 bhar sakte hain.",
        evm: "EVM ka matlab hai Electronic Voting Machine. Aapko bas apne pasand ke candidate ke symbol ke aage wala blue button dabana hota hai.",
        vvpat: "VVPAT EVM se judi ek machine hai. Yeh 7 seconds ke liye ek paper slip dikhati hai jisse aap apna vote verify kar sakte hain.",
        mcc: "Model Code of Conduct (MCC) Election Commission ki guidelines hain jo free aur fair elections ensure karti hain.",
        booth: "Polling booth woh jagah hai jahan aap vote dalne jaate hain. Aap apna booth EPIC number use karke ECI website par dhoondh sakte hain.",
        nota: "NOTA EVM par aakhri button hota hai. Yeh aapko sabhi candidates ko officially reject karne ka option deta hai.",
        counting: "Votes ki counting CCTV surveillance ke under secure centers mein hoti hai. EVM seals agents ke samne check ki jati hain.",
        first_time: "First-time voter, welcome! Ensure karein ki aap registered hain. Voting day par Voter ID laayein, ink lagwayein, aur EVM button press karein!",
        documents: "Vote dalne ke liye aapka naam voter list mein hona chahiye. Voter ID (EPIC) lana zaruri hai, nahi toh Aadhaar, PAN, DL ya Passport chalega.",
        results: "Election results Returning Officer declare karte hain jab counting puri ho jati hai. Jise sabse zyada votes milte hain, woh jeet'ta hai."
      }
    }
  }
};
