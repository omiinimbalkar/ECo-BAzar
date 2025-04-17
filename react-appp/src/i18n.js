import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "EcoBazar is Working!",
      description: "EcoBazar is an online platform to buy, sell, and recycle used items. It connects buyers and sellers directly, promoting eco-friendly habits.",
      heading: "What is EcoBazar?",
      moreInfo: "EcoBazar helps reduce waste by allowing users to buy and sell second-hand products like electronics, furniture, books, and more.",
      howToUse: {
        title: "How to Use EcoBazar",
        step1: "1. Create Your Account\nSign up or log in with your email. Your profile info will be stored safely.",
        step2: "2. Sell Your Product\nClick 'Sell Product' in the top-right menu. Fill in product details and post.",
        step3: "3. Like Products\nClick the ❤️ icon to save products for future purchase.",
        step4: "4. Edit or Delete\nManage your products from your Profile. Products auto-delete after 18 days.",
        step5: "5. Search Smartly\nUse the search bar to find products by location like Palghar, Virar, etc.",
        step6: "6. Explore Categories\nAll product categories are shown just below the header.",
        step7: "7. Notifications\nGet alerts when someone chats, likes, or posts a new product.",
        step8: "8. Scrap Price Page\nCheck rates for items like plastic, glass, newspaper, etc.",
        step9: "9. Chat and Deal\nClick on any product, open chat, finalize the deal easily.",
        step10: "10. Call Seller\nUse the provided number to contact the seller directly.",
        step11: "11. Cash on Delivery Only\nNo online payment. Meet, check item, and pay by cash.",
        step12: "12. Contact Support\nIf your product doesn't sell, use 'Contact Buyer' in the header."
      }
    }
  },
  hi: {
    translation: {
      title: "इकोबाजार काम कर रहा है!",
      description: "इकोबाजार एक ऑनलाइन प्लेटफ़ॉर्म है जहाँ आप पुराने सामान खरीद और बेच सकते हैं। यह सीधे खरीदारों और विक्रेताओं को जोड़ता है और पर्यावरण के अनुकूल आदतों को बढ़ावा देता है।",
      heading: "इकोबाजार क्या है?",
      moreInfo: "इकोबाजार इलेक्ट्रॉनिक्स, फर्नीचर, किताबें आदि जैसे पुराने उत्पादों को खरीदने और बेचने में मदद करता है जिससे कचरे को कम किया जा सके।",
      howToUse: {
        title: "इकोबाजार का उपयोग कैसे करें",
        step1: "1. अपना खाता बनाएँ\nईमेल से लॉगिन या साइनअप करें। आपकी प्रोफाइल सुरक्षित रखी जाएगी।",
        step2: "2. उत्पाद बेचें\nशीर्ष दाएं मेनू में 'Sell Product' पर क्लिक करें। जानकारी भरें और पोस्ट करें।",
        step3: "3. उत्पाद पसंद करें\n❤️ आइकन पर क्लिक कर प्रोडक्ट को भविष्य के लिए सेव करें।",
        step4: "4. संपादित या हटाएं\nप्रोफ़ाइल में जाकर अपने उत्पाद प्रबंधित करें। 18 दिनों के बाद ऑटो डिलीट हो जाएगा।",
        step5: "5. स्मार्ट सर्च करें\nपलघर, विरार आदि स्थानों से खोजें।",
        step6: "6. श्रेणियाँ देखें\nसभी उत्पाद श्रेणियाँ हेडर के नीचे दी गई हैं।",
        step7: "7. सूचनाएँ\nचैट, लाइक या नए प्रोडक्ट की जानकारी तुरंत प्राप्त करें।",
        step8: "8. स्क्रैप रेट पेज\nप्लास्टिक, कांच, अखबार आदि की दरें देखें।",
        step9: "9. चैट और सौदा करें\nउत्पाद पर क्लिक करें, चैट करें, सौदा पक्का करें।",
        step10: "10. विक्रेता को कॉल करें\nनंबर पर सीधे कॉल करके बात करें।",
        step11: "11. केवल नकद भुगतान\nऑनलाइन पेमेंट नहीं है। उत्पाद देखें, पसंद आए तो कैश में भुगतान करें।",
        step12: "12. सहायता से संपर्क करें\nयदि उत्पाद नहीं बिकता है तो 'Contact Buyer' विकल्प का उपयोग करें।"
      }
    }
  },
  mr: {
    translation: {
      title: "इकोबझार चालू आहे!",
      description: "इकोबझार हा एक ऑनलाइन प्लॅटफॉर्म आहे जिथे तुम्ही जुनी उत्पादने खरेदी व विक्री करू शकता. तो थेट खरेदीदार आणि विक्रेते यांना जोडतो आणि पर्यावरणपूरक सवयींना चालना देतो.",
      heading: "इकोबझार म्हणजे काय?",
      moreInfo: "इकोबझार इलेक्ट्रॉनिक्स, फर्निचर, पुस्तके आणि इतर अनेक गोष्टी विक्री आणि खरेदी करण्यास मदत करतो, ज्यामुळे कचरा कमी होतो.",
      howToUse: {
        title: "इकोबझार वापरण्याची पद्धत",
        step1: "1. तुमचे खाते तयार करा\nईमेलने साइन अप किंवा लॉगिन करा. तुमची प्रोफाइल सुरक्षित राहील.",
        step2: "2. तुमचा प्रोडक्ट विक्री करा\n'विक्री करा' वर क्लिक करा आणि माहिती भरून पोस्ट करा.",
        step3: "3. प्रोडक्टला लाईक करा\n❤️ वर क्लिक करून पुढच्यासाठी प्रोडक्ट सेव्ह करा.",
        step4: "4. एडिट किंवा डिलीट करा\nप्रोफाइलमधून प्रोडक्ट व्यवस्थापित करा. 18 दिवसांनंतर ते आपोआप हटवले जाईल.",
        step5: "5. स्मार्ट सर्च करा\nस्थानावरून सर्च करा, जसे की पालघर, विरार.",
        step6: "6. कॅटेगरी ब्राउज करा\nसर्व कॅटेगरी हेडरच्या खाली दिसतील.",
        step7: "7. सूचना मिळवा\nकोणी मेसेज केला, प्रोडक्ट आवडलं किंवा नवीन पोस्ट टाकलं की अलर्ट मिळेल.",
        step8: "8. स्क्रॅप रेट पाहा\nप्लास्टिक, काच, पेपर यांचे दर इथे बघा.",
        step9: "9. चॅट करा आणि डील फिक्स करा\nप्रोडक्टवर क्लिक करा, चॅट सुरू करा आणि सौदा पक्का करा.",
        step10: "10. विक्रेत्याशी कॉल करा\nप्रोडक्ट डिटेल्समध्ये दिलेल्या नंबरवर कॉल करा.",
        step11: "11. फक्त COD (कॅश ऑन डिलिव्हरी)\nऑनलाईन पेमेंट नाही. भेटा, प्रोडक्ट बघा आणि कॅशने पैसे द्या.",
        step12: "12. मदतीसाठी संपर्क करा\nप्रोडक्ट विकले नाही तर 'Contact Buyer' पर्याय वापरा."
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
