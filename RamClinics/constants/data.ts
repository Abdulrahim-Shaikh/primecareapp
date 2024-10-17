import uuid from "react-native-uuid";
//top doctor img
import topDoctorImg1 from "../assets/images/top-doctor-1.png";
import topDoctorImg2 from "../assets/images/top-doctor-2.png";
import topDoctorImg3 from "../assets/images/top-doctor-3.png";
import topDoctorImg4 from "../assets/images/top-doctor-4.png";

//friend image
import friendPic1 from "../assets/images/friend-1.png";
import friendPic2 from "../assets/images/friend-2.png";
import friendPic3 from "../assets/images/friend-3.png";
import friendPic4 from "../assets/images/friend-4.png";
import friendPic5 from "../assets/images/friend-5.png";
import friendPic6 from "../assets/images/friend-6.png";

//doctor speciality icon
import specialityIcon1 from "../assets/images/docton-speciality-icon-1.png";
import specialityIcon2 from "../assets/images/docton-speciality-icon-2.png";
import specialityIcon3 from "../assets/images/docton-speciality-icon-3.png";
import specialityIcon4 from "../assets/images/docton-speciality-icon-4.png";
import specialityIcon5 from "../assets/images/docton-speciality-icon-5.png";
import specialityIcon6 from "../assets/images/docton-speciality-icon-6.png";
import specialityIcon7 from "../assets/images/docton-speciality-icon-7.png";
import specialityIcon8 from "../assets/images/docton-speciality-icon-8.png";
import specialityIcon9 from "../assets/images/docton-speciality-icon-9.png";
import specialityIcon10 from "../assets/images/docton-speciality-icon-10.png";

//payment methods
import masterCard from "../assets/images/master-card.png";
import paypal from "../assets/images/paypal.png";
import payoneer from "../assets/images/payoneer.png";
import creditCard from "../assets/images/card.png";
import bank from "../assets/images/bank.png";

//upcoming slider img
// import sliderImg1 from "../assets/images/upcoming-slider-img-1.png";
// import sliderImg2 from "../assets/images/upcoming-slider-img-2.png";
// import sliderImg3 from "../assets/images/upcoming-slider-img-3.png";
// import sliderImg4 from "../assets/images/upcoming-slider-img-4.png";
import sliderImg1 from "../assets/images/doc1.png";
import sliderImg2 from "../assets/images/doc2.png";
import sliderImg3 from "../assets/images/doc3.png";
import sliderImg4 from "../assets/images/doc3.png";

export const onbordingSliderData = [
  {
    id: 1,
    title: "Expert Doctor",
    colorTitle: "Advice Online",
    description:
      "Access professional medical guidance conveniently from the comfort of your home.",
  },
  {
    id: 2,
    title: "Doctor Support, Always",
    colorTitle: "Ready",
    description:
      "Access reliable medical assistance whenever you need it, from trusted professionals.",
  },
  {
    id: 3,
    title: "Stay Healthy, ",
    colorTitle: "Stay Connected",
    description:
      "Stay connected to health resources for a healthier, more informed lifestyle.",
  },
];

export const doctorSpecialityData = [
  {
    id: uuid.v4(),
    icon: "eye",
    title: "Ophthalmologist",
    totalDoctors: "361",
  },
  {
    id: uuid.v4(),
    icon: "medical",
    title: "Neurologist",
    totalDoctors: "381",
  },
  {
    id: uuid.v4(),
    icon: "eye",
    title: "Cardiologists",
    totalDoctors: "241",
  },
  {
    id: uuid.v4(),
    icon: "medical",
    title: "Dermatologists",
    totalDoctors: "91",
  },
];

export const topDoctorData = [
  {
    id: uuid.v4(),
    name: "Dr. Marvin McKinney",
    img: topDoctorImg1,
    department: "Cardiologist",
    medicalName: "JFK Medical",
    rating: "4.3",
    availableTime: "12pm-5pm",
    fee: "40",
    slots: {},
    speciality: "General Dentist",
  },
  {
    id: uuid.v4(),
    name: "Dr. Dianne Russell",
    img: topDoctorImg2,
    department: "Neorologist",
    medicalName: "Dhaka Medical",
    rating: "4.5",
    availableTime: "12pm-5pm",
    fee: "48",
    slots: {
      "1": [
        {
          "slotName": "Morning",
        },
        {
          "slotName": "Morning2",
        },
      ]
    },
    speciality: "General Dentist",
  },
  {
    id: uuid.v4(),
    name: "Dr. Marvin McKinney",
    img: topDoctorImg3,
    department: "Urologist",
    medicalName: "Birdem Medical",
    rating: "4.2",
    availableTime: "12pm-5pm",
    fee: "53",
    slots: {},
    speciality: "General Dentist",
  },
  {
    id: uuid.v4(),
    name: "Dr. Savannah Nguyen",
    img: topDoctorImg4,
    department: "Immunologist",
    medicalName: "PG Hospital",
    rating: "4.7",
    availableTime: "12pm-5pm",
    fee: "55",
    slots: {},
    speciality: "General Dentist",
  },
];

export const servicesList = [
  {
    id: uuid.v4(),
    img: friendPic1,
    name: "Jane Cooper",
    message: "Hi Cooper how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic2,
    name: "Gerald Hernandez",
    message: "Hi Gerald how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic3,
    name: "Martin Santos",
    message: "Hi Martin how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic4,
    name: "Ethan Greer",
    message: "Hi Ethan how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic5,
    name: "Birdie Perry",
    message: "Hi Birdie how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic6,
    name: "Lela Lindsey",
    message: "Hi Lela how are you...",
  },
];


export const serviceData = [
  {
    id: 1,
    serviceNameAr: "طب أسنان الأسرة",
    serviceNameEn: "Family Dentistry",
  },
  {
    id: 2,
    serviceNameAr: "اللثة",
    serviceNameEn: "Family Dentistry",
  },
  {
    id: 3,
    serviceNameAr: "طب الأسنان الحفظي",
    serviceNameEn: "Family Dentistry",
  },
  {
    id: 4,
    serviceNameAr: "طب الأسنان الوقائي",
    serviceNameEn: "Maxillofacial Surgery and Implantology",
  },
]


export const friendChatList = [
  {
    id: uuid.v4(),
    img: friendPic1,
    name: "Jane Cooper",
    message: "Hi Cooper how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic2,
    name: "Gerald Hernandez",
    message: "Hi Gerald how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic3,
    name: "Martin Santos",
    message: "Hi Martin how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic4,
    name: "Ethan Greer",
    message: "Hi Ethan how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic5,
    name: "Birdie Perry",
    message: "Hi Birdie how are you...",
  },
  {
    id: uuid.v4(),
    img: friendPic6,
    name: "Lela Lindsey",
    message: "Hi Lela how are you...",
  },
];

export const myAppoinmentData = [
  {
    id: uuid.v4(),
    name: "Dr. Adam Williams",
    img: topDoctorImg1,
    sessionStatus: "Upcoming",
    sessionTyps: "Video Call",
    rating: "4.3",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Erik Hudson",
    img: topDoctorImg2,
    sessionStatus: "Completed",
    sessionTyps: "Audio Call",
    rating: "4.7",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Jim Neal",
    img: topDoctorImg3,
    sessionStatus: "Upcoming",
    sessionTyps: "Video Call",
    rating: "4.5",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Derrick Ferguson",
    img: topDoctorImg4,
    sessionStatus: "Cancelled",
    sessionTyps: "Chat Session",
    rating: "4.3",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Eula Byrd",
    img: topDoctorImg1,
    sessionStatus: "Upcoming",
    sessionTyps: "Video Call",
    rating: "4.4",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Katharine Hansen",
    img: topDoctorImg2,
    sessionStatus: "Completed",
    sessionTyps: "Audio Call",
    rating: "4.3",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Alfred Lyons",
    img: topDoctorImg3,
    sessionStatus: "Cancelled",
    sessionTyps: "Video Call",
    rating: "4.2",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Lula Lyons",
    img: topDoctorImg4,
    sessionStatus: "Cancelled",
    sessionTyps: "Chat Session",
    rating: "4.3",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },

  {
    id: uuid.v4(),
    name: "Dr. Georgia Lewis",
    img: topDoctorImg1,
    sessionStatus: "Completed",
    sessionTyps: "Video Call",
    rating: "4.9",
    speciality: "General Dentist",
    availableTime: "12pm-5pm",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Maggie Robertson",
    img: topDoctorImg2,
    sessionStatus: "Cancelled",
    sessionTyps: "Chat Session",
    rating: "4.3",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Carl King",
    img: topDoctorImg3,
    sessionStatus: "Upcoming",
    sessionTyps: "Video Call",
    rating: "4.5",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
  {
    id: uuid.v4(),
    name: "Dr. Sue Copeland",
    img: topDoctorImg4,
    sessionStatus: "Completed",
    sessionTyps: "Audio Call",
    rating: "4.3",
    availableTime: "12pm-5pm",
    speciality: "General Dentist",
    branchName: "",
    practitionerName: "",
    department: "",
    hisStatus: "",
    age: 0,
    startTime: "",
    endTime: "",
    slots: [],
  },
];

export const profileSettings = [
  // {
  //   id: 1,
  //   icon: "notifications-outline",
  //   name: "Notification",
  //   link: "/NotificationSettings",
  // },
  {
    id: 2,
    icon: "receipt-outline",
    name: "My Invoices",
    link: "/MyInvoices",
  },
  {
    id: 3,
    icon: "document-text-outline",
    name: "My Prescription",
    link: "/MyPrescription",
  },
  // {
  //   id: 4,
  //   icon: "card-outline",
  //   name: "Payment",
  //   link: "/AddCardPage",
  // },
  // {
  //   id: 4,
  //   icon: "lock-closed-outline",
  //   name: "Security",
  //   link: "/ChangePassword",
  // },
  {
    id: 5,
    icon: "language-outline",
    name: "Language",
    link: "/LanguageSettings",
  },
  // {
  //   id: 7,
  //   icon: "sunny-outline",
  //   name: "Dark Mode",
  //   link: "/NotificationSettings",
  // },
  {
    id: 6,
    icon: "person",
    name: "About Us",
    link: "/AboutUs",
  },
  {
    id: 7,
    icon: "help",
    name: "Contact Us",
    link: "/HelpSupport",
  },
  {
    id: 8,
    icon: "list",
    name: "Terms & Conditions",
    link: "/TermsAndConditions",
  },
  {
    id: 9,
    icon: "globe-outline",
    name: "Our Website",
    link: "https://ramclinics.net/?lang=en",
  },
];

export const scheduleDates = [
  {
    date: "7",
    day: "Sat",
  },
  {
    date: "8",
    day: "Sun",
  },
  {
    date: "9",
    day: "Mon",
  },
  {
    date: "10",
    day: "Tue",
  },
  {
    date: "11",
    day: "Wed",
  },
  {
    date: "12",
    day: "Thu",
  },
  {
    date: "13",
    day: "Fri",
  },
  {
    date: "14",
    day: "Sat",
  },
  {
    date: "15",
    day: "Sun",
  },
];

export const doctorSpecialityData2 = [
  {
    name: "Surgeon",
    img: specialityIcon1,
    totalDoctor: "934",
  },
  {
    name: "Physician",
    img: specialityIcon2,
    totalDoctor: "527",
  },
  {
    name: "Pediatrician",
    img: specialityIcon3,
    totalDoctor: "382",
  },
  {
    name: "Gynecologist",
    img: specialityIcon4,
    totalDoctor: "247",
  },
  {
    name: "Cardiologist",
    img: specialityIcon5,
    totalDoctor: "727",
  },
  {
    name: "Dermatologist",
    img: specialityIcon6,
    totalDoctor: "717",
  },
  {
    name: "Neurologist",
    img: specialityIcon7,
    totalDoctor: "659",
  },
  {
    name: "Psychiatrist",
    img: specialityIcon8,
    totalDoctor: "123",
  },
  {
    name: "Oncologist",
    img: specialityIcon9,
    totalDoctor: "680",
  },
  {
    name: "Radiologist",
    img: specialityIcon10,
    totalDoctor: "097",
  },
];

export const feesInformation = [
  {
    name: "Voice Call",
    desc: "Can make a video call with doctor",
    price: "35",
  },
  {
    name: "Audio Call",
    desc: "Can make a voice call with doctor",
    price: "25",
  },
  {
    name: "Chat Session",
    desc: "Can make a chat session with doctor",
    price: "12",
  },
];

export const paymentMethods = [
  {
    name: "Paypal",
    img: paypal,
  },
  {
    name: "Payoneer",
    img: payoneer,
  },
  {
    name: "Bank Transfer",
    img: bank,
  },
  {
    name: "Mastercard",
    img: masterCard,
  },
  {
    name: "Credit Card",
    img: creditCard,
  },
];

export const faqData = [
  {
    id: 1,
    question: "What is Appoinx?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
  {
    id: 2,
    question: "How to use Appoinx?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
  {
    id: 3,
    question: "How to schedule consultation on Appoinx?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
  {
    id: 4,
    question: "How to logout from Appoinx?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
  {
    id: 5,
    question: "Is there a free tips to get health in this app?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },

  {
    id: 6,
    question: "Is Appoinx free to use?",
    answer:
      "Appoinx is greatest medical online consultation app platform in this century",
  },
];

export const upcomingSliderData = [
  {
    id: 1,
    title: "Liposuction (Minor)",
    desc: "National Day Offer",
    img: sliderImg1,
  },
  {
    id: 2,
    title: "",
    desc: "Mohters Day SSC",
    img: sliderImg2,
  },
  {
    id: 3,
    title: "LHR Full Body",
    desc: "Dr. Daliya Friday",
    img: sliderImg3,
  },
  {
    id: 4,
    title: "LHR Back and Chest",
    desc: "Dr. Daliya Friday",
    img: sliderImg4,
  },
];

export const countries =
  [
    {
      "name": "Afghanistan",
      "dial_code": "+93",
      "code": "AF"
    },
    {
      "name": "Aland Islands",
      "dial_code": "+358",
      "code": "AX"
    },
    {
      "name": "Albania",
      "dial_code": "+355",
      "code": "AL"
    },
    {
      "name": "Algeria",
      "dial_code": "+213",
      "code": "DZ"
    },
    {
      "name": "AmericanSamoa",
      "dial_code": "+1684",
      "code": "AS"
    },
    {
      "name": "Andorra",
      "dial_code": "+376",
      "code": "AD"
    },
    {
      "name": "Angola",
      "dial_code": "+244",
      "code": "AO"
    },
    {
      "name": "Anguilla",
      "dial_code": "+1264",
      "code": "AI"
    },
    {
      "name": "Antarctica",
      "dial_code": "+672",
      "code": "AQ"
    },
    {
      "name": "Antigua and Barbuda",
      "dial_code": "+1268",
      "code": "AG"
    },
    {
      "name": "Argentina",
      "dial_code": "+54",
      "code": "AR"
    },
    {
      "name": "Armenia",
      "dial_code": "+374",
      "code": "AM"
    },
    {
      "name": "Aruba",
      "dial_code": "+297",
      "code": "AW"
    },
    {
      "name": "Australia",
      "dial_code": "+61",
      "code": "AU"
    },
    {
      "name": "Austria",
      "dial_code": "+43",
      "code": "AT"
    },
    {
      "name": "Azerbaijan",
      "dial_code": "+994",
      "code": "AZ"
    },
    {
      "name": "Bahamas",
      "dial_code": "+1242",
      "code": "BS"
    },
    {
      "name": "Bahrain",
      "dial_code": "+973",
      "code": "BH"
    },
    {
      "name": "Bangladesh",
      "dial_code": "+880",
      "code": "BD"
    },
    {
      "name": "Barbados",
      "dial_code": "+1246",
      "code": "BB"
    },
    {
      "name": "Belarus",
      "dial_code": "+375",
      "code": "BY"
    },
    {
      "name": "Belgium",
      "dial_code": "+32",
      "code": "BE"
    },
    {
      "name": "Belize",
      "dial_code": "+501",
      "code": "BZ"
    },
    {
      "name": "Benin",
      "dial_code": "+229",
      "code": "BJ"
    },
    {
      "name": "Bermuda",
      "dial_code": "+1441",
      "code": "BM"
    },
    {
      "name": "Bhutan",
      "dial_code": "+975",
      "code": "BT"
    },
    {
      "name": "Bolivia, Plurinational State of",
      "dial_code": "+591",
      "code": "BO"
    },
    {
      "name": "Bosnia and Herzegovina",
      "dial_code": "+387",
      "code": "BA"
    },
    {
      "name": "Botswana",
      "dial_code": "+267",
      "code": "BW"
    },
    {
      "name": "Brazil",
      "dial_code": "+55",
      "code": "BR"
    },
    {
      "name": "British Indian Ocean Territory",
      "dial_code": "+246",
      "code": "IO"
    },
    {
      "name": "Brunei Darussalam",
      "dial_code": "+673",
      "code": "BN"
    },
    {
      "name": "Bulgaria",
      "dial_code": "+359",
      "code": "BG"
    },
    {
      "name": "Burkina Faso",
      "dial_code": "+226",
      "code": "BF"
    },
    {
      "name": "Burundi",
      "dial_code": "+257",
      "code": "BI"
    },
    {
      "name": "Cambodia",
      "dial_code": "+855",
      "code": "KH"
    },
    {
      "name": "Cameroon",
      "dial_code": "+237",
      "code": "CM"
    },
    {
      "name": "Canada",
      "dial_code": "+1",
      "code": "CA"
    },
    {
      "name": "Cape Verde",
      "dial_code": "+238",
      "code": "CV"
    },
    {
      "name": "Cayman Islands",
      "dial_code": "+ 345",
      "code": "KY"
    },
    {
      "name": "Central African Republic",
      "dial_code": "+236",
      "code": "CF"
    },
    {
      "name": "Chad",
      "dial_code": "+235",
      "code": "TD"
    },
    {
      "name": "Chile",
      "dial_code": "+56",
      "code": "CL"
    },
    {
      "name": "China",
      "dial_code": "+86",
      "code": "CN"
    },
    {
      "name": "Christmas Island",
      "dial_code": "+61",
      "code": "CX"
    },
    {
      "name": "Cocos (Keeling) Islands",
      "dial_code": "+61",
      "code": "CC"
    },
    {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO"
    },
    {
      "name": "Comoros",
      "dial_code": "+269",
      "code": "KM"
    },
    {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG"
    },
    {
      "name": "Congo, The Democratic Republic of the Congo",
      "dial_code": "+243",
      "code": "CD"
    },
    {
      "name": "Cook Islands",
      "dial_code": "+682",
      "code": "CK"
    },
    {
      "name": "Costa Rica",
      "dial_code": "+506",
      "code": "CR"
    },
    {
      "name": "Cote d'Ivoire",
      "dial_code": "+225",
      "code": "CI"
    },
    {
      "name": "Croatia",
      "dial_code": "+385",
      "code": "HR"
    },
    {
      "name": "Cuba",
      "dial_code": "+53",
      "code": "CU"
    },
    {
      "name": "Cyprus",
      "dial_code": "+357",
      "code": "CY"
    },
    {
      "name": "Czech Republic",
      "dial_code": "+420",
      "code": "CZ"
    },
    {
      "name": "Denmark",
      "dial_code": "+45",
      "code": "DK"
    },
    {
      "name": "Djibouti",
      "dial_code": "+253",
      "code": "DJ"
    },
    {
      "name": "Dominica",
      "dial_code": "+1767",
      "code": "DM"
    },
    {
      "name": "Dominican Republic",
      "dial_code": "+1849",
      "code": "DO"
    },
    {
      "name": "Ecuador",
      "dial_code": "+593",
      "code": "EC"
    },
    {
      "name": "Egypt",
      "dial_code": "+20",
      "code": "EG"
    },
    {
      "name": "El Salvador",
      "dial_code": "+503",
      "code": "SV"
    },
    {
      "name": "Equatorial Guinea",
      "dial_code": "+240",
      "code": "GQ"
    },
    {
      "name": "Eritrea",
      "dial_code": "+291",
      "code": "ER"
    },
    {
      "name": "Estonia",
      "dial_code": "+372",
      "code": "EE"
    },
    {
      "name": "Ethiopia",
      "dial_code": "+251",
      "code": "ET"
    },
    {
      "name": "Falkland Islands (Malvinas)",
      "dial_code": "+500",
      "code": "FK"
    },
    {
      "name": "Faroe Islands",
      "dial_code": "+298",
      "code": "FO"
    },
    {
      "name": "Fiji",
      "dial_code": "+679",
      "code": "FJ"
    },
    {
      "name": "Finland",
      "dial_code": "+358",
      "code": "FI"
    },
    {
      "name": "France",
      "dial_code": "+33",
      "code": "FR"
    },
    {
      "name": "French Guiana",
      "dial_code": "+594",
      "code": "GF"
    },
    {
      "name": "French Polynesia",
      "dial_code": "+689",
      "code": "PF"
    },
    {
      "name": "Gabon",
      "dial_code": "+241",
      "code": "GA"
    },
    {
      "name": "Gambia",
      "dial_code": "+220",
      "code": "GM"
    },
    {
      "name": "Georgia",
      "dial_code": "+995",
      "code": "GE"
    },
    {
      "name": "Germany",
      "dial_code": "+49",
      "code": "DE"
    },
    {
      "name": "Ghana",
      "dial_code": "+233",
      "code": "GH"
    },
    {
      "name": "Gibraltar",
      "dial_code": "+350",
      "code": "GI"
    },
    {
      "name": "Greece",
      "dial_code": "+30",
      "code": "GR"
    },
    {
      "name": "Greenland",
      "dial_code": "+299",
      "code": "GL"
    },
    {
      "name": "Grenada",
      "dial_code": "+1473",
      "code": "GD"
    },
    {
      "name": "Guadeloupe",
      "dial_code": "+590",
      "code": "GP"
    },
    {
      "name": "Guam",
      "dial_code": "+1671",
      "code": "GU"
    },
    {
      "name": "Guatemala",
      "dial_code": "+502",
      "code": "GT"
    },
    {
      "name": "Guernsey",
      "dial_code": "+44",
      "code": "GG"
    },
    {
      "name": "Guinea",
      "dial_code": "+224",
      "code": "GN"
    },
    {
      "name": "Guinea-Bissau",
      "dial_code": "+245",
      "code": "GW"
    },
    {
      "name": "Guyana",
      "dial_code": "+595",
      "code": "GY"
    },
    {
      "name": "Haiti",
      "dial_code": "+509",
      "code": "HT"
    },
    {
      "name": "Holy See (Vatican City State)",
      "dial_code": "+379",
      "code": "VA"
    },
    {
      "name": "Honduras",
      "dial_code": "+504",
      "code": "HN"
    },
    {
      "name": "Hong Kong",
      "dial_code": "+852",
      "code": "HK"
    },
    {
      "name": "Hungary",
      "dial_code": "+36",
      "code": "HU"
    },
    {
      "name": "Iceland",
      "dial_code": "+354",
      "code": "IS"
    },
    {
      "name": "India",
      "dial_code": "+91",
      "code": "IN"
    },
    {
      "name": "Indonesia",
      "dial_code": "+62",
      "code": "ID"
    },
    {
      "name": "Iran, Islamic Republic of Persian Gulf",
      "dial_code": "+98",
      "code": "IR"
    },
    {
      "name": "Iraq",
      "dial_code": "+964",
      "code": "IQ"
    },
    {
      "name": "Ireland",
      "dial_code": "+353",
      "code": "IE"
    },
    {
      "name": "Isle of Man",
      "dial_code": "+44",
      "code": "IM"
    },
    {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL"
    },
    {
      "name": "Italy",
      "dial_code": "+39",
      "code": "IT"
    },
    {
      "name": "Jamaica",
      "dial_code": "+1876",
      "code": "JM"
    },
    {
      "name": "Japan",
      "dial_code": "+81",
      "code": "JP"
    },
    {
      "name": "Jersey",
      "dial_code": "+44",
      "code": "JE"
    },
    {
      "name": "Jordan",
      "dial_code": "+962",
      "code": "JO"
    },
    {
      "name": "Kazakhstan",
      "dial_code": "+77",
      "code": "KZ"
    },
    {
      "name": "Kenya",
      "dial_code": "+254",
      "code": "KE"
    },
    {
      "name": "Kiribati",
      "dial_code": "+686",
      "code": "KI"
    },
    {
      "name": "Korea, Democratic People's Republic of Korea",
      "dial_code": "+850",
      "code": "KP"
    },
    {
      "name": "Korea, Republic of South Korea",
      "dial_code": "+82",
      "code": "KR"
    },
    {
      "name": "Kuwait",
      "dial_code": "+965",
      "code": "KW"
    },
    {
      "name": "Kyrgyzstan",
      "dial_code": "+996",
      "code": "KG"
    },
    {
      "name": "Laos",
      "dial_code": "+856",
      "code": "LA"
    },
    {
      "name": "Latvia",
      "dial_code": "+371",
      "code": "LV"
    },
    {
      "name": "Lebanon",
      "dial_code": "+961",
      "code": "LB"
    },
    {
      "name": "Lesotho",
      "dial_code": "+266",
      "code": "LS"
    },
    {
      "name": "Liberia",
      "dial_code": "+231",
      "code": "LR"
    },
    {
      "name": "Libyan Arab Jamahiriya",
      "dial_code": "+218",
      "code": "LY"
    },
    {
      "name": "Liechtenstein",
      "dial_code": "+423",
      "code": "LI"
    },
    {
      "name": "Lithuania",
      "dial_code": "+370",
      "code": "LT"
    },
    {
      "name": "Luxembourg",
      "dial_code": "+352",
      "code": "LU"
    },
    {
      "name": "Macao",
      "dial_code": "+853",
      "code": "MO"
    },
    {
      "name": "Macedonia",
      "dial_code": "+389",
      "code": "MK"
    },
    {
      "name": "Madagascar",
      "dial_code": "+261",
      "code": "MG"
    },
    {
      "name": "Malawi",
      "dial_code": "+265",
      "code": "MW"
    },
    {
      "name": "Malaysia",
      "dial_code": "+60",
      "code": "MY"
    },
    {
      "name": "Maldives",
      "dial_code": "+960",
      "code": "MV"
    },
    {
      "name": "Mali",
      "dial_code": "+223",
      "code": "ML"
    },
    {
      "name": "Malta",
      "dial_code": "+356",
      "code": "MT"
    },
    {
      "name": "Marshall Islands",
      "dial_code": "+692",
      "code": "MH"
    },
    {
      "name": "Martinique",
      "dial_code": "+596",
      "code": "MQ"
    },
    {
      "name": "Mauritania",
      "dial_code": "+222",
      "code": "MR"
    },
    {
      "name": "Mauritius",
      "dial_code": "+230",
      "code": "MU"
    },
    {
      "name": "Mayotte",
      "dial_code": "+262",
      "code": "YT"
    },
    {
      "name": "Mexico",
      "dial_code": "+52",
      "code": "MX"
    },
    {
      "name": "Micronesia, Federated States of Micronesia",
      "dial_code": "+691",
      "code": "FM"
    },
    {
      "name": "Moldova",
      "dial_code": "+373",
      "code": "MD"
    },
    {
      "name": "Monaco",
      "dial_code": "+377",
      "code": "MC"
    },
    {
      "name": "Mongolia",
      "dial_code": "+976",
      "code": "MN"
    },
    {
      "name": "Montenegro",
      "dial_code": "+382",
      "code": "ME"
    },
    {
      "name": "Montserrat",
      "dial_code": "+1664",
      "code": "MS"
    },
    {
      "name": "Morocco",
      "dial_code": "+212",
      "code": "MA"
    },
    {
      "name": "Mozambique",
      "dial_code": "+258",
      "code": "MZ"
    },
    {
      "name": "Myanmar",
      "dial_code": "+95",
      "code": "MM"
    },
    {
      "name": "Namibia",
      "dial_code": "+264",
      "code": "NA"
    },
    {
      "name": "Nauru",
      "dial_code": "+674",
      "code": "NR"
    },
    {
      "name": "Nepal",
      "dial_code": "+977",
      "code": "NP"
    },
    {
      "name": "Netherlands",
      "dial_code": "+31",
      "code": "NL"
    },
    {
      "name": "Netherlands Antilles",
      "dial_code": "+599",
      "code": "AN"
    },
    {
      "name": "New Caledonia",
      "dial_code": "+687",
      "code": "NC"
    },
    {
      "name": "New Zealand",
      "dial_code": "+64",
      "code": "NZ"
    },
    {
      "name": "Nicaragua",
      "dial_code": "+505",
      "code": "NI"
    },
    {
      "name": "Niger",
      "dial_code": "+227",
      "code": "NE"
    },
    {
      "name": "Nigeria",
      "dial_code": "+234",
      "code": "NG"
    },
    {
      "name": "Niue",
      "dial_code": "+683",
      "code": "NU"
    },
    {
      "name": "Norfolk Island",
      "dial_code": "+672",
      "code": "NF"
    },
    {
      "name": "Northern Mariana Islands",
      "dial_code": "+1670",
      "code": "MP"
    },
    {
      "name": "Norway",
      "dial_code": "+47",
      "code": "NO"
    },
    {
      "name": "Oman",
      "dial_code": "+968",
      "code": "OM"
    },
    {
      "name": "Pakistan",
      "dial_code": "+92",
      "code": "PK"
    },
    {
      "name": "Palau",
      "dial_code": "+680",
      "code": "PW"
    },
    {
      "name": "Palestinian Territory, Occupied",
      "dial_code": "+970",
      "code": "PS"
    },
    {
      "name": "Panama",
      "dial_code": "+507",
      "code": "PA"
    },
    {
      "name": "Papua New Guinea",
      "dial_code": "+675",
      "code": "PG"
    },
    {
      "name": "Paraguay",
      "dial_code": "+595",
      "code": "PY"
    },
    {
      "name": "Peru",
      "dial_code": "+51",
      "code": "PE"
    },
    {
      "name": "Philippines",
      "dial_code": "+63",
      "code": "PH"
    },
    {
      "name": "Pitcairn",
      "dial_code": "+872",
      "code": "PN"
    },
    {
      "name": "Poland",
      "dial_code": "+48",
      "code": "PL"
    },
    {
      "name": "Portugal",
      "dial_code": "+351",
      "code": "PT"
    },
    {
      "name": "Puerto Rico",
      "dial_code": "+1939",
      "code": "PR"
    },
    {
      "name": "Qatar",
      "dial_code": "+974",
      "code": "QA"
    },
    {
      "name": "Romania",
      "dial_code": "+40",
      "code": "RO"
    },
    {
      "name": "Russia",
      "dial_code": "+7",
      "code": "RU"
    },
    {
      "name": "Rwanda",
      "dial_code": "+250",
      "code": "RW"
    },
    {
      "name": "Reunion",
      "dial_code": "+262",
      "code": "RE"
    },
    {
      "name": "Saint Barthelemy",
      "dial_code": "+590",
      "code": "BL"
    },
    {
      "name": "Saint Helena, Ascension and Tristan Da Cunha",
      "dial_code": "+290",
      "code": "SH"
    },
    {
      "name": "Saint Kitts and Nevis",
      "dial_code": "+1869",
      "code": "KN"
    },
    {
      "name": "Saint Lucia",
      "dial_code": "+1758",
      "code": "LC"
    },
    {
      "name": "Saint Martin",
      "dial_code": "+590",
      "code": "MF"
    },
    {
      "name": "Saint Pierre and Miquelon",
      "dial_code": "+508",
      "code": "PM"
    },
    {
      "name": "Saint Vincent and the Grenadines",
      "dial_code": "+1784",
      "code": "VC"
    },
    {
      "name": "Samoa",
      "dial_code": "+685",
      "code": "WS"
    },
    {
      "name": "San Marino",
      "dial_code": "+378",
      "code": "SM"
    },
    {
      "name": "Sao Tome and Principe",
      "dial_code": "+239",
      "code": "ST"
    },
    {
      "name": "Saudi Arabia",
      "dial_code": "+966",
      "code": "SA"
    },
    {
      "name": "Senegal",
      "dial_code": "+221",
      "code": "SN"
    },
    {
      "name": "Serbia",
      "dial_code": "+381",
      "code": "RS"
    },
    {
      "name": "Seychelles",
      "dial_code": "+248",
      "code": "SC"
    },
    {
      "name": "Sierra Leone",
      "dial_code": "+232",
      "code": "SL"
    },
    {
      "name": "Singapore",
      "dial_code": "+65",
      "code": "SG"
    },
    {
      "name": "Slovakia",
      "dial_code": "+421",
      "code": "SK"
    },
    {
      "name": "Slovenia",
      "dial_code": "+386",
      "code": "SI"
    },
    {
      "name": "Solomon Islands",
      "dial_code": "+677",
      "code": "SB"
    },
    {
      "name": "Somalia",
      "dial_code": "+252",
      "code": "SO"
    },
    {
      "name": "South Africa",
      "dial_code": "+27",
      "code": "ZA"
    },
    {
      "name": "South Sudan",
      "dial_code": "+211",
      "code": "SS"
    },
    {
      "name": "South Georgia and the South Sandwich Islands",
      "dial_code": "+500",
      "code": "GS"
    },
    {
      "name": "Spain",
      "dial_code": "+34",
      "code": "ES"
    },
    {
      "name": "Sri Lanka",
      "dial_code": "+94",
      "code": "LK"
    },
    {
      "name": "Sudan",
      "dial_code": "+249",
      "code": "SD"
    },
    {
      "name": "Suriname",
      "dial_code": "+597",
      "code": "SR"
    },
    {
      "name": "Svalbard and Jan Mayen",
      "dial_code": "+47",
      "code": "SJ"
    },
    {
      "name": "Swaziland",
      "dial_code": "+268",
      "code": "SZ"
    },
    {
      "name": "Sweden",
      "dial_code": "+46",
      "code": "SE"
    },
    {
      "name": "Switzerland",
      "dial_code": "+41",
      "code": "CH"
    },
    {
      "name": "Syrian Arab Republic",
      "dial_code": "+963",
      "code": "SY"
    },
    {
      "name": "Taiwan",
      "dial_code": "+886",
      "code": "TW"
    },
    {
      "name": "Tajikistan",
      "dial_code": "+992",
      "code": "TJ"
    },
    {
      "name": "Tanzania, United Republic of Tanzania",
      "dial_code": "+255",
      "code": "TZ"
    },
    {
      "name": "Thailand",
      "dial_code": "+66",
      "code": "TH"
    },
    {
      "name": "Timor-Leste",
      "dial_code": "+670",
      "code": "TL"
    },
    {
      "name": "Togo",
      "dial_code": "+228",
      "code": "TG"
    },
    {
      "name": "Tokelau",
      "dial_code": "+690",
      "code": "TK"
    },
    {
      "name": "Tonga",
      "dial_code": "+676",
      "code": "TO"
    },
    {
      "name": "Trinidad and Tobago",
      "dial_code": "+1868",
      "code": "TT"
    },
    {
      "name": "Tunisia",
      "dial_code": "+216",
      "code": "TN"
    },
    {
      "name": "Turkey",
      "dial_code": "+90",
      "code": "TR"
    },
    {
      "name": "Turkmenistan",
      "dial_code": "+993",
      "code": "TM"
    },
    {
      "name": "Turks and Caicos Islands",
      "dial_code": "+1649",
      "code": "TC"
    },
    {
      "name": "Tuvalu",
      "dial_code": "+688",
      "code": "TV"
    },
    {
      "name": "Uganda",
      "dial_code": "+256",
      "code": "UG"
    },
    {
      "name": "Ukraine",
      "dial_code": "+380",
      "code": "UA"
    },
    {
      "name": "United Arab Emirates",
      "dial_code": "+971",
      "code": "AE"
    },
    {
      "name": "United Kingdom",
      "dial_code": "+44",
      "code": "GB"
    },
    {
      "name": "United States",
      "dial_code": "+1",
      "code": "US"
    },
    {
      "name": "Uruguay",
      "dial_code": "+598",
      "code": "UY"
    },
    {
      "name": "Uzbekistan",
      "dial_code": "+998",
      "code": "UZ"
    },
    {
      "name": "Vanuatu",
      "dial_code": "+678",
      "code": "VU"
    },
    {
      "name": "Venezuela, Bolivarian Republic of Venezuela",
      "dial_code": "+58",
      "code": "VE"
    },
    {
      "name": "Vietnam",
      "dial_code": "+84",
      "code": "VN"
    },
    {
      "name": "Virgin Islands, British",
      "dial_code": "+1284",
      "code": "VG"
    },
    {
      "name": "Virgin Islands, U.S.",
      "dial_code": "+1340",
      "code": "VI"
    },
    {
      "name": "Wallis and Futuna",
      "dial_code": "+681",
      "code": "WF"
    },
    {
      "name": "Yemen",
      "dial_code": "+967",
      "code": "YE"
    },
    {
      "name": "Zambia",
      "dial_code": "+260",
      "code": "ZM"
    },
    {
      "name": "Zimbabwe",
      "dial_code": "+263",
      "code": "ZW"
    }
  ]