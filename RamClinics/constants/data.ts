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
    icon: "person-circle-outline",
    name: "My Invoices",
    link: "/MyInvoices",
  },
  {
    id: 3,
    icon: "tablet-portrait-outline",
    name: "My Prescription",
    link: "/MyPrescription",
  },
  // {
  //   id: 4,
  //   icon: "card-outline",
  //   name: "Payment",
  //   link: "/AddCardPage",
  // },
  {
    id: 4,
    icon: "lock-closed-outline",
    name: "Security",
    link: "/ChangePassword",
  },
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
    name: "Help Center",
    link: "/HelpSupport",
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
