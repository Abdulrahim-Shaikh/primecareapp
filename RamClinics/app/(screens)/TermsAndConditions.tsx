

import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo_transparent.png";
import HeaderWithBackButton from "../../components/ui/HeaderWithBackButton";



const TermsAndConditions = () => {

    return (

        <SafeAreaView>
            <ScrollView className="bg-gray px-2">
                <View className="px- ">
                    <View className="flex flex-row justify-start items-center gap-4 pb-6">
                    <HeaderWithBackButton isPushBack={true} title="Terms & Conditions" />
                        <AntDesign name="exclamationcircleo" size={20} color={"rgb(120 53 15)"} />
                    </View>
                </View>
                <View className="flex pt-4 items-start justify-between">
                    <View className="flex flex-row">
                        <Image source={logo} style={{ maxHeight: 60, maxWidth: 100}}/>
                        <Text className="ml-10 flex justify-center align-center text-xl text-teal-500">RAM Clinics Medical App {'\n'} Terms and Conditions</Text>
                    </View>
                   
                    <View className="mt-4 italic bg-white rounded-xl px-3 pb-10">
                        <Text className="text-justify text-sm mt-4">
                            <Text className="text-justify text-sm"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;These terms and conditions of RAM Medical Group read with vthe Privacy Policy available on the</Text>
                            Site/Application constitutes a legal binding agreement (“Agreement”) between You and RAM Clinics
                            and shall apply to and govern Your visit to and use, of the Website/ Mobile Application (whether in the
                            capacity of an user or a Practitioner) and any of its products or services whether through a computer or
                            a mobile phone as well as to all information, recommendations and or Services provided to You on or
                            through the Site/Application. This Agreement defines the terms and conditions under which you are
                            allowed to use the Site/Application and describes the manner in which we shall treat your account while
                            you are registered as a member with us. This User Terms apply  to the Services made available by
                            RAM Clinics on the Site/Application including various products offered by RAM Clinics, the Services
                            rendered by Practitioners listed on the Site/Application, to various users including medical practitioners
                            and other users/visitors of the Site/Application. We reserve the right to store information on a User’s
                            computer in the form of “cookie” or similar file for purposes of modifying the Site/Application to reflect
                            the User’s preference. RAM Clinics shall try and ensure that all information that is provided on the
                            Site/Application with respect to policies / products/Services are accurate in all respects and are kept up
                            to date. However, Ram Clinics does not guarantee the timeliness, accuracy, completeness, reliability
                            or content of the information and any changes that are made with respect to the same and the
                            visitor/Customer is required to check the accuracy of the same with RAM Clinics. </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-2">
                            RAM Clinics’ performance to this Agreement is subject to existing laws and legal process, and nothing
                            contained in this Agreement is in derogation of RAM Clinics’ right to comply with governmental, court
                            and law enforcement directions relating to the use of this Site/Application or information provided
                            to/gathered by RAM Clinics vis-à-vis such use.
                        </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">
                            RAM Clinics may introduce new services in relation to the Site/Application from time to time. The
                            existence and availability of the new services will be notified on the Site/Application as and when they
                            become available and any revisions in the Terms & Conditions will take place in accordance with these
                            Terms & Conditions. In addition, RAM Clinics may also publish notices of general nature, which are
                            applicable to all visitors or Customers in a Social Media or on its Site/Application. Such notices will have
                            the same effect as a notice served individually to each visitor or Customer.
                        </Text>

                        <Text className="list text-justify ml-1 mr-1 text-sm mt-4">
                            This electronic record is generated by a computer system and does not require any physical or digital
                            signatures. By accessing this Site/Application, You are consenting to be bound by these User Terms
                            and the Privacy Policy. <Text className="text-yellow-500"> PLEASE ENSURE THAT YOU READ AND UNDERSTAND ALL THESE USER
                            TERMS BEFORE YOU USE THE SITE/APPLICATION.</Text>  If You do not accept any of the User Terms,
                            then please do not use the Site/Application or avail any of the services/Services being provided therein.
                            Your acceptance of the User Terms shall be deemed to include your acceptance of the Privacy Policy
                            available at the Site/Application.
                        </Text>
                         <Text className="text-teal-500 text-semibold mt-5 "> DEFINTIONS</Text>
                        <Text className="text-justify ml-4 mr- mt-4 text-gray-900">
                            All of the defined and capitalized terms in these User Terms will have the meaning assigned to them
                            here belowd
                        </Text>
                        <Text className="block mt-4 ml-4 text-justify text-amber-500 text-md">(1) “Account“ : <Text className=" text-justify text-amber-900 ml-1 mr-1 mt-4 text-sm">shall mean the account created by the Customer on the Application for availing the
                            Services provided/facilitated by RAM Clinics. </Text></Text>

                        <Text className="block mt-4 ml-4 text-justify text-yellow-500 text-md">(2) “Applicable Laws“ : <Text style={styles.italic} className="text-justify text-amber-900 ml-1 mr-1 text-sm mt-4">shall mean the account created by the Customer on the Application for availing the
                            Services provided/facilitated by RAM Clinics. </Text></Text>

                        <Text className="block mt-4 ml-4 text-justify text-yellow-500 text-md">(3) “Application“ : <Text style={styles.italic} className="text-justify text-amber-900 ml-1 mr-1 text-sm mt-4 text-sm"> shall mean our mobile application and/or website as updated by RAM Clinics from
                            time to time.  </Text></Text>

                        <Text className="block mt-4 ml-4 text-justify text-yellow-500 text-md text-md">(4) “Customer/ You/User" shall mean and include :<Text style={styles.italic} className="text-justify text-amber-900 ml-1 mr-1 text-sm mt-4 text-sm"> shall mean our mobile application and/or website as updated by RAM Clinics from
                            time to time.  </Text></Text>

                        <Text className="block mt-2 pl-10 text-justify text-gray-500">• <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            A medical practitioner or healthcare/wellness provider (whether an individual professional
                            or an organization) or similar institution wishing to be listed, or already listed, and providing
                            healthcare services, on the Site/Application, including designated, authorized associates of
                            such practitioners or institutions (“Practitioner(s)”, “you” or “User”); or
                            time to time.  </Text></Text>
                        <Text className="block mt-2 pl-10 text-justify text-gray-500">•  <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            A patient, availing this service on his/her consent, being or not being sponsored/promoted
                            by any organization/body to utilize the services through the Site/Application, his/her
                            representatives or affiliates, searching for availing health and medical services through the
                            Site/Application; or.   </Text></Text>
                        <Text className="block mt-2 pl-10 text-justify text-gray-500">•  <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            Otherwise a user of the Site/Application who has an Account on the Site/Application (“End
                            User”). </Text></Text>
                        <Text className="block mt-4 pl-10 text-justify text-gray-500">•  <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            A visitor of the Site/Application.</Text></Text>

                        <Text className="block mt-4 ml-4 text-justify text-yellow-500 text-md">(5) “Force Majeure Event” <Text className="text-justify text-amber-900 ml-1 mr-1 text-sm mt-4">
                            shall mean any and all events arising due to any cause beyond the
                            reasonable control of RAM Clinics. </Text></Text>
                            <Text className="block mt-4 ml-4 text-justify text-yellow-500 text-md">(6) “Registration Data”  <Text className="text-justify text-amber-900 ml-1 mr-1 text-sm mt-4">
                            shall mean and may include the present, valid, true and accurate name, email ID, phone number and such other information as may be required by RAM Clinics from the Customer
                            from time to time for registration on the Application.</Text></Text>
                            <Text className="block mt-4 ml-4 text-justify text-yellow-500 text-md">(7) “Services”  <Text className="text-justify text-amber-900 ml-1 mr-1 text-sm mt-4">
                            shall mean the various categories of Services including the following made available through the Site/Application:</Text></Text>
                        <Text className="block mt-2 pl-10 text-justify text-sm text-gray-500">• For Practitioners : <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            A medical practitioner or healthcare/wellness provider (whether an individual professional
                            or an organization) or similar institution wishing to be listed, or already listed, and providing
                            healthcare services, on the Site/Application, including designated, authorized associates of
                            such practitioners or institutions (“Practitioner(s)”, “you” or “User”); or
                            time to time.  </Text></Text>
                        <Text className="block mt-2 pl-10 text-justify text-sm text-gray-500">• For other Users: : <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            Facility to create and maintain ‘Health Accounts’ and upload claim
                            requests track the progress of the same; search for Practitioners by specialty, services
                            offered or any other criteria that may  be developed and made available by RAM
                            Clinics; make appointments with Practitioners; interact with healthcare chatbot; and To avail
                            other services offered by RAM Clinics and its partners, like but not limited to, medicine
                            delivery, diagnostics, home-healthcare, track fitness activities and health vitals,
                            etc.Insurance related services/consulting services. </Text></Text>
                        <Text className="block mt-4">• <Text className="text-teal-500 text-semibold">APPOINTMENT BOOKING AND INTERACTION</Text>
                            <Text className="text-teal-500 text-semibold ml-2">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;WITH PRACTITIONERS</Text></Text>
                        <Text className="block mt-4 ml-4 text-justify">(1)  “Account“ : <Text className="text-justify ml-1 mr-1 text-sm mt-4">
                            While RAM Clinics will try to ensure a confirmed on-time appointment for an End-User who
                            requested an appointment on Site/Application, RAM Clinics does not guarantee that a
                            patient will get a confirmed appointment. Further, RAM Clinics has no liability if such
                            appointment is confirmed but later cancelled by Practitioners, or the Practitioners are not
                            available as per the given appointment time over text, video, audio or in-person. </Text></Text>
                        <Text className="block mt-4 text-sm ml-4"><Text className="text-teal-500 text-semibold">Without prejudice to the generality of the above,</Text>
                            <Text className="text-teal-500 text-semibold ml-2">&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; RAM Clinics will not be liable for:</Text></Text>
                        <Text className="block mt-2 pl-10 text-justify">i • <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            any wrong medication or treatment quality being given by the Practitioner(s), or any medical
                            negligence on part of the Practitioner(s);</Text></Text>
                        <Text className="block mt-2 pl-10 text-justify">ii •  <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            A patient, availing this service on his/her consent, being or not being sponsored/promoted
                            by any organization/body to utilize the services through the Site/Application, his/her
                            representatives or affiliates, searching for availing health and medical services through the
                            Site/Application; or.</Text></Text>
                        <Text className="block mt-2 pl-10 text-justify">iii •  <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            A patient, availing this service on his/her consent, being or not being sponsored/promoted
                            by any organization/body to utilize the services through the Site/Application, his/her
                            representatives or affiliates, searching for availing health and medical services through the
                            Site/Application; or.</Text></Text>
                        <Text className="block mt-2 pl-10 text-justify">iv •  <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            any medical eventualities that might occur subsequent to using the services of a Practitioner, whom
                            the User has selected on the basis of the information available on the Site Application or with whom the
                            User has booked an appointment through the Site/Application.</Text></Text>
                        <Text className="block mt-2 pl-10 text-justify">v •  <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            Any error in the medical reports provided by the associated bodies/partners/service providers;</Text></Text>
                        <Text className="block mt-2 pl-10 text-justify"><Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            Further, RAM Clinics shall not be liable, under any event, for any comments or feedback given by any
                            of the Users in relation to the services provided by another User. The option of Users to give feedback
                            remains at RAM Clinics sole discretion and may be modified or withdrawn at its sole discretion. RAM
                            Clinics may moderate such feedback at any time. RAM Clinics shall not be obliged to act in any manner
                            to give effect to the content of Users’ feedback, such as suggestions for delisting of a particular
                            Practitioner from the Application/Site.
                        </Text></Text>
                        <Text className="block mt-2 pl-5 text-justify text-gray-500"><Text className="text-justify text-sm mt-4">
                            RAM Clinics collects, directly or indirectly, and displays on the Site/Application, relevant information
                            regarding the profile and practice of the Practitioners/service providers listed on the Site/Application,
                            such as their specialisation, qualification, fees, location, visiting hours, and similar details. RAM Clinics
                            takes reasonable efforts to ensure that such information is updated at frequent intervals. Although RAM
                            Clinics screens and vets the information and photos submitted by the Practitioners, RAM Clinics cannot
                            be held liable for any inaccuracies or incompleteness represented from it, despite such reasonable
                            efforts.
                        </Text></Text>
                        <Text className="block mt-4">• <Text className="text-teal-500 text-semibold">APPLICATION LICENSE </Text>
                        </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">1. Subject to Your compliance with these User Terms, RAM Clinics grants You a limited, revocable,
                            non-exclusive, non-transferable and non-sub-licensable license to download and install a copy of the
                            Application on a single mobile device that You own or control and to run such copy of the Application
                            solely for Your own personal use and to use the Site. </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">2. You shall not (i) license, sublicense, sell, resell, transfer, assign, distribute or otherwise commercially
                            exploit or make available to any third party the Service or Site in any way; (ii) modify or make derivative
                            works based upon the Service or Application; (iii) create Internet “links” to the Service or “frame” or
                            “mirror” any Site on any other server or wireless or Internet-based device; (iv) reverse engineer or
                            access the Site in order to (a) design or build a competitive product or service, (b) design or build a
                            product using similar ideas, features, functions or graphics of the Service or Site, or (c) copy, reproduce,
                            record, or make available to the public any ideas, features, functions or graphics of the Service or Site,
                            or (v) launch an automated program or script, including, but not limited to, web spiders, web crawlers,
                            web robots, web ants, web indexers, bots, viruses or worms, or any program which may make multiple
                            server requests per second, or unduly burdens or hinders the operation and/or performance of the
                            Service or Site. </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">3. You shall not: (i) send spam or otherwise duplicative or unsolicited messages in violation of
                            Applicable Laws; (ii) send or store infringing, obscene, threatening, libelous, or otherwise unlawful or
                            tortious material, including material harmful to children or violative of third party privacy rights; (iii) send
                            or store material containing software viruses, worms, Trojan horses or other harmful computer code,
                            files, scripts, agents or programs; (iv) interfere with or disrupt the integrity or performance of the Site,
                            the Application or Service or the data contained therein; or (v) attempt to gain unauthorized access to
                            the Site, the Application or Service or its related systems or networks. </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">4. RAM Clinics will have the right to investigate and prosecute violations of any of the above to the
                            fullest extent of the law. RAM Clinics may involve and cooperate with law enforcement authorities in
                            prosecuting Users who violate these User Terms. You acknowledge that RAM Clinics has no obligation
                            to monitor Your access to or use of the Site, or posted content, but has the right to do so for the purpose
                            of operating the Site and Service, to ensure Your compliance with these User Terms, or to comply with
                            Applicable Law or the order or requirement of a court, administrative agency or other Governmental
                            body. RAM Clinics reserves the right, at any time and without prior notice, to remove or disable access
                            to any content that RAM Clinics at its sole discretion, considers to be in violation of these User Terms
                            or otherwise harmful to the Site, the Service or Application. </Text>
                            <Text className="block mt-4">• <Text className="text-teal-500 text-semibold">LIMITATION OF LIABILITY</Text>
                            </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">1. The information, recommendations and/or Services provided to You on or through the Site/ 
                            Application are for general information purposes only and does not constitute advice. RAM Clinics will 
                            reasonably keep the Site/Application and its contents correct and up to date but does not guarantee 
                            that (the contents of) the Site is free of errors, defects, malware and viruses or that the Site is correct, 
                            up to date and accurate. </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">2. RAM Clinics shall not be liable for any damages resulting from the use of or inability to use the 
                            Site/Application, including damages caused by wrong usage of the Site, error in call centre number, 
                            network issues, malware, viruses or any incorrectness or incompleteness of the Information or the or 
                            Application.</Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">3. In no event shall RAM Clinics shall be liable for:  </Text>        
                        <Text className="block mt-2 pl-10 text-justify text-gray-500">i • <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            provision of or failure to provide all or any service by Practitioners or listed third parties to 
                            users contacted or managed through the Site/Application; </Text></Text>
                        <Text className="block mt-2 pl-10 text-justify text-gray-500">ii • <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            any content posted, transmitted, exchanged or received by or on behalf of any user or other 
                            person on or through the Site/Application;  </Text></Text>
                        <Text className="block mt-2 pl-10 text-justify text-gray-500">iii • <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            any unauthorized access to or alteration of your transmissions or data; or</Text></Text>
                        <Text className="block mt-2 pl-10 text-justify text-gray-500">iv • <Text style={styles.italic} className="text-justify ml-1 mr-1 text-sm mt-4">
                            any other matter relating to the Site/Application or the Service.</Text></Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">4.  You agree that we shall not be liable for any damages arising from interruption, suspension or 
                            termination of the Site/Application, including but not limited to direct, indirect, incidental, special, 
                            consequential or exemplary damages, whether such interruption, suspension or termination was 
                            justified or not, negligent or intentional, inadvertent or advertent. Applicable law may not allow the 
                            limitation or exclusion of liability or incidental or consequential damages. However, in no event shall our 
                            liability to you for all damages, losses and causes of action (whether in contract or tort, including but 
                            not limited to, negligence) exceed the amount paid by You, if any, for accessing the Site/Application. 
                            Policy/ies are marketed and/or distributed solely by RAM Clinics and are not in any way associated to 
                            or being sold, marketed or offered for sale by the Payment Gateway Service provider and the Payment 
                            Gateway Service provider shall not be liable for the same. </Text>
                        <Text className="text-teal-500 text-semibold  mt-4">• INTELLECTUAL PROPERTY OWNERSHIP</Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">1.   RAM Clinics alone (and its licensors, where applicable) shall own all right, title and interest, including 
                            all related intellectual property rights, in and to (i) the Site, Application, product, Service and any 
                            suggestions, ideas, enhancement requests, feedback, recommendations or any other offering; (ii) text, 
                            graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork 
                            and computer code; or (iii) other information provided by You or any other party relating to the Site, 
                            Application or the Service. Third party trademarks may appear on this Site/ Application and all rights 
                            therein are reserved to the registered owners of those trademarks. For use of any third party’s 
                            intellectual property, You need to get permission directly from the owner of the intellectual property for 
                            any use.  </Text>
                        <Text className="text-justify ml-1 mr-1 text-sm mt-4">2. These User Terms do not constitute a sale and do not convey to You any rights of ownership in or 
                            related to the Site, the Application or the Service, or any intellectual property rights owned by RAM 
                            Clinics You shall be solely responsible for any violations of any laws and for any infringements of any 
                            intellectual property rights caused by use of the Services or the Site/ Application.. </Text>
                        <Text className="text-teal-500 text-semibold  mt-4">•  DISCLAIMER</Text>
                        <Text className="text-gray-500 ml-4 mt-4">No Warranty</Text>
                        <Text className="text-justify ml-4 text-sm mt-2">1.   RAM Clinics alone (and its licensors, where applicable) shall own all right, title and interest, including 
                            all related intellectual property rights, in and to (i) the Site, Application, product, Service and any 
                            suggestions, ideas, enhancement requests, feedback, recommendations or any other offering; (ii) text, 
                            graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork 
                            and computer code; or (iii) other information provided by You or any other party relating to the Site, 
                            Application or the Service. Third party trademarks may appear on this Site/ Application and all rights 
                            therein are reserved to the registered owners of those trademarks. For use of any third party’s 
                            intellectual property, You need to get permission directly from the owner of the intellectual property for 
                            any use.  </Text>   
                            <Text className="text-gray-500 ml-4">No Liability</Text>
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">The Services provided by RAM Clinics or any of its licensors or service providers/partners are provided 
                            on an “as is” and “as available” basis, and without any warranties or conditions (express or implied, 
                            including the implied warranties of merchantability, accuracy, fitness for a particular purpose, title and 
                            non-infringement, arising by statute or otherwise in law or from a course of dealing or usage or trade). 
                            does not provide or make any representation, warranty or guarantee, express or implied about the 
                            Site/Application or the Services. RAM Clinics does not guarantee the accuracy or completeness of any 
                            content or information provided by users on the Site/Application. To the fullest extent permitted by law, 
                            RAM Clinics disclaims all liability arising out of the Your use or reliance upon the Site/Application, the 
                            Services, representations and warranties made by other users or any content or information provided 
                            by the users on the Site/Application.</Text>
                        <Text className="text-teal-500 text-semibold  mt-4">•  AUTHORITY TO RAM Clinics</Text>  
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">The Customer/You hereby authorizes RAM Clinics to carry out his instructions, effecting such 
                            transactions as may be permitted by RAM Clinics from time to time, in accordance with these Terms & 
                            Conditions and such other terms as may be specified by. </Text>
                        <Text className="text-teal-500 text-semibold  mt-4">•  EVIDENCE OF TRANSACTIONS </Text>  
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">For any transaction which may be permitted by RAM Clinics from time to time, RAM Clinics’  own 
                            records of such transactions maintained through computer systems or otherwise, shall be accepted as 
                            conclusive and binding for all purposes. The record of The Transaction as generated from the systems 
                            of RAM Clinics shall be conclusive proof of the genuineness and accuracy of such transactions. </Text>
                        <Text className="text-teal-500 text-semibold  mt-4">•  RESTRICTIONS ON USE </Text>  
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">RAM Clinics owns and holds all the rights for the information, contents, audio, video, logos and 
                            trademarks contained in this Site/Application. Any reproduction, modification, creation of derivate 
                            works, distribution, transmission, copying, selling, displaying, publishing or using any of the information, 
                            contents, audio, video, logos and trademarks contained in this Site/Application for any purpose 
                            whatsoever, whether electronically or otherwise, without the prior written permission of RAM Clinics is 
                            strictly prohibited. Any violation of this provision would be strictly dealt with. You may download material 
                            displayed on this Site/Application for your personal use only, provided that you also retain the clauses 
                            pertaining to all copyright and other proprietary notices contained in the materials. </Text>  
                        <Text className="text-teal-500 text-semibold  mt-4">•  USE OF INFORMATION </Text>  
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">The content is available for informational purposes only. The posting of contents and access to this 
                            Site/Application does not render, either explicitly or implicitly, any provision of Services or products by 
                            us. All advertisements contain only an indication of cover offered by the products. For more information, 
                            please read the policy wordings before concluding a sale.</Text>     
                        <Text className="text-teal-500 text-semibold  mt-4">•  RESERVATION OF RIGHTS</Text>  
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">We reserve the right to change, modify, add to, or remove discounts, portions of these terms of use at 
                        any time. </Text>
                        <Text className="text-teal-500 text-semibold  mt-4">•  MODIFICATION OF THE SERVICE AND USER</Text>
                        <Text className="text-teal-500 text-semibold  ml-4">TERMS </Text>   
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">1. RAM Clinics reserves the right, at its sole discretion, to modify or replace, in part or full, any of these 
                            User Terms, or change, suspend, block, discontinue or restrict Your use to all or any feature of the 
                            Service or Site/Application at any time.</Text> 
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">2. RAM Clinics shall not be required to notify You of any changes made to these User Terms. The 
                            revised User Terms shall be made available on the Site. You are requested to regularly visit the Site to 
                            view the most current User Terms. It shall be Your responsibility to check these User Terms periodically 
                            for changes. Your continued use of the Site/Application constitutes acceptance of the changes and an 
                            Agreement to be bound by User Term, as amended. </Text> 
                        <Text className="text-teal-500 text-semibold  mt-4">•  EXCLUSIVE AGREEMENT </Text>  
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">You agree that these User Terms are the complete and exclusive statement of agreement supersede 
                            any proposal or prior agreement, oral or written, and any other communications between you and RAM 
                            Clinics relating to the subject matter of these User Terms. These User Terms, as the same may be 
                            amended from time to time, will prevail over any subsequent oral communications between you and the 
                            Site/Application and/or RAM Clinics.</Text>
                        <Text className="text-teal-500 text-semibold  mt-4">•  ASSIGNMENT </Text>  
                        <Text className="text-justify ml-4 text-sm mt-2 -semibold">You shall not assign Your rights under these User Terms without prior written approval of RAM Clinics. 
                            RAM Clinics can assign its rights under the User Terms to any affiliate.</Text>                                            
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default TermsAndConditions;

const styles = StyleSheet.create({
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },
    underline: { textDecorationLine: 'underline' }
});
