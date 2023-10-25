import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import {Header} from '@app/components';
import {NavigatorParamList} from '@app/navigators/app-navigator';
import {color, verticalScale} from '@app/theme';
import {StackScreenProps} from '@react-navigation/stack';
import WebView from 'react-native-webview';

export const TermsAndPrivacy: FC<
  StackScreenProps<NavigatorParamList, 'termsAndPrivacy'>
> = ({navigation}) => {
  const renderHTML = `
  <!DOCTYPE html>
<html>

<head>
    <title></title>
</head>

<body>
    <h1><strong><span style="font-size: 100px;">Privacy Policy</span></strong></h1>
    <h3 style="font-size: 50px;"><strong><em>Last updated July 01, 2023</em></strong></h3>
    <p><br></p>
    <p><span style="font-weight: 400; font-size: 40px;">This Privacy Notice (&quot;Notice&quot;) outlines how TeeFi, an online financial education platform for teens, collects, uses, and processes your personal information. We value your privacy and aim to provide transparency regarding our practices, including the types of personal information we collect, the individuals involved, the activities we engage in, and the third parties we may collaborate with.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">This Notice covers the information we process, including personal information provided by organizations we collaborate with, such as schools, non-profit organizations, or employers. However, it&apos;s important to note that we can only provide information on how we handle personal information and not the practices of other organizations, unless they are our vendors who process data based on our instructions. If a Learner is enrolled in another organization&apos;s program, that organization will directly communicate with Learners and their Parents about the program, and their privacy notice will apply. We recommend reaching out to them to understand their personal information processing practices.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Additionally, please be aware that our websites and applications may contain links to external sites that we do not own or control. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy notices of any third-party sites you visit after leaving our platforms.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">We reserve the right to modify this Notice at any time, and the last updated date will be indicated. If necessary, or if there are significant changes to the Notice, we will provide notice or seek consent as required by applicable law.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Please review the sections below for further details on our privacy practices. If you have any questions or concerns, please feel free to contact us at&nbsp;</span><span style="font-size: 28px;"><a href="mailto:help@teefi.io"><span style="font-weight: 400; font-size: 30;">help@teefi.io</span></a></span><span style="font-weight: 400; font-size: 28px;">&nbsp;</span></p>
    <p>&nbsp;</p>
    <h1><strong><span style="font-size: 100px;">Key Terms</span></strong></h1>
    <p><br></p>
    <p><span style="font-weight: 400; font-size: 40px;">We have defined some key terms in this Notice to provide clarity as you read the information:</span></p>
    <ul>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Customers</strong><span style="font-weight: 400;">&nbsp;include Learners and their Parents, Teachers, and Partners.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Learners&nbsp;</strong><span style="font-weight: 400;">are minors aged 18 years and younger who participate in TeeFi activities.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Parents&nbsp;</strong><span style="font-weight: 400;">refer to the parents or legal guardians of the Learners.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Teachers&nbsp;</strong><span style="font-weight: 400;">are independent contractors, either individuals or organizations, who manage Learners of a school or an organization through TeeFi&apos;s platform.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Partners</strong><span style="font-weight: 400;">&nbsp;are companies (third parties) that we collaborate with, such as schools, learning centers, employers, or non-profit organizations, and who are not &quot;teachers.&quot;</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Application</strong><span style="font-weight: 400;">&nbsp;refers to TeeFi, the software program provided by the Company.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Company</strong><span style="font-weight: 400;">&nbsp;(referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to TeeFuture Pte. Ltd, 68 Circular Road #02-01, 049422, Singapore.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Cookies</strong><span style="font-weight: 400;">&nbsp;are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Device&nbsp;</strong><span style="font-weight: 400;">means any device that can access the Service such as a computer, a cellphone or a digital tablet.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Account</strong><span style="font-weight: 400;">&nbsp;means a unique account created for You to access our Service or parts of our Service.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Services&nbsp;</strong><span style="font-weight: 400;">refer to the Lessons, 3-Jar Money Management System, Build My World game, or other engagements by Customers with TeeFi on the Application or the Website or both.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Service Provider</strong><span style="font-weight: 400;">&nbsp;means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Lessons&nbsp;</strong><span style="font-weight: 400;">are educational courses developed by TeeFi.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>3-Jar Money Management System</strong><span style="font-weight: 400;">&nbsp;is a tool that helps kids build money management habits from a young age.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Build My World&nbsp;</strong><span style="font-weight: 400;">is a financial education game offered by TeeFi.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Personal Information/Data</strong><span style="font-weight: 400;">&nbsp;refers to information that is linked to an identified (or identifiable) person.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Process&nbsp;</strong><span style="font-weight: 400;">refers to any activity involving personal information, such as collecting, using, sharing, storing, and more.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Usage Data&nbsp;</strong><span style="font-weight: 400;">refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Website</strong><span style="font-weight: 400;">&nbsp;refers to TeeFi, accessible from&nbsp;</span><a href="https://www.teefi.io/"><span style="font-weight: 400;">https://www.teefi.io</span></a><span style="font-weight: 400;">&nbsp;</span></li>
    </ul>
    <h1><strong><span style="font-size: 100px;">Collecting and Using Your Personal Data</span></strong></h1>
    <h2><strong><span style="font-size: 70px;">Types of Data Collected</span></strong></h2>
    <h3><strong><span style="font-size: 50px;">Personal Data</span></strong></h3>
    <p><span style="font-weight: 400; font-size: 40px;">While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</span></p>
    <ul>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400;">Email address</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400;">First name and last name</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400;">Address, State, Province, ZIP/Postal code, City, Country</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400;">Date of Birth&nbsp;</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400;">Usage Data&nbsp;</span></li>
    </ul>
    <h3><strong><span style="font-size: 50px;">Usage Data</span></strong></h3>
    <p><span style="font-weight: 400; font-size: 40px;">Usage Data is collected automatically when using the Service. Usage Data collected by TeeFi includes information such as avatar, leaderboard rankings, learning hours, and virtual earnings obtained from lessons for educational purposes that contribute to your child&apos;s learning experience.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Usage Data may include information such as Your Device&apos;s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</span></p>
    <h3"><strong><span style="font-size: 50px;">Information Collected while Using the Application</span></strong></h3>
    <p><span style="font-weight: 400; font-size: 40px;">While using Our Application, in order to provide features of Our Application, We may collect, with Your prior permission:</span></p>
    <ul>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400;">Pictures and other information from your Device&apos;s camera and photo library</span></li>
    </ul>
    <p><span style="font-weight: 400; font-size: 40px;">We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded to the Company&apos;s servers and/or a Service Provider&apos;s server or it may be simply stored on Your device.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">You can enable or disable access to this information at any time, through Your Device settings.</span></p>
    <h3><strong><span style="font-size: 50px;">Tracking Technologies and Cookies</span></strong></h3>
    <p><span style="font-weight: 400; font-size: 40px;">We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:</span></p>
    <ul>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Cookies or Browser Cookies.</strong><span style="font-weight: 400;">&nbsp;A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Web Beacons.</strong><span style="font-weight: 400;">&nbsp;Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).</span></li>
    </ul>
    <p><span style="font-weight: 400; font-size: 40px;">Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">We use both Session and Persistent Cookies for the purposes set out below:</span></p>
    <ul>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Necessary / Essential Cookies</strong><strong><br></strong><span style="font-weight: 400;">Type: Session Cookies<br>Administered by: Us<br>Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Cookies Policy / Notice Acceptance Cookies</strong><strong><br></strong><span style="font-weight: 400;">Type: Persistent Cookies<br>Administered by: Us<br>Purpose: These Cookies identify if users have accepted the use of cookies on the Website.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>Functionality Cookies</strong><strong><br></strong><span style="font-weight: 400;">Type: Persistent Cookies<br>Administered by: Us<br>Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.</span></li>
    </ul>
    <h2><strong><span style="font-size: 70px;">Use of Your Personal Data</span></strong></h2>
    <p><span style="font-weight: 400; font-size: 40px;">The Company may use Personal Data for the following purposes:</span></p>
    <ul>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>To provide and maintain our Service</strong><span style="font-weight: 400;">, including to monitor the usage of our Service.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>To manage Your Account:</strong><span style="font-weight: 400;">&nbsp;to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>For the performance of a subscription:</strong><span style="font-weight: 400;">&nbsp;the development, compliance and undertaking of the subscription for the products, items or services You have purchased or of any other contract with Us through the Service.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application&apos;s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>To provide You</strong><span style="font-weight: 400;">&nbsp;with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>To manage Your requests:</strong><span style="font-weight: 400;">&nbsp;To attend and manage Your requests to Us.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>For business transfers:</strong><span style="font-weight: 400;">&nbsp;We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>For other purposes</strong><span style="font-weight: 400;">: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</span></li>
    </ul>
    <p><span style="font-weight: 400; font-size: 40px;">We may share Your personal information in the following situations:</span></p>
    <ul>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>With Service Providers:</strong><span style="font-weight: 400;">&nbsp;We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>For business transfers:</strong><span style="font-weight: 400;">&nbsp;We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>With Affiliates:</strong><span style="font-weight: 400;">&nbsp;We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>With business partners:</strong><span style="font-weight: 400;">&nbsp;We may share Your information with Our business partners to offer You certain products, services or promotions.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>With other users:</strong><span style="font-weight: 400;">&nbsp;when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</span></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><strong>With Your consent</strong><span style="font-weight: 400;">: We may disclose Your personal information for any other purpose with Your consent.</span></li>
    </ul>
    <h2><strong><span style="font-size: 70px;">Retention of Your Personal Data</span></strong></h2>
    <p><span style="font-weight: 400; font-size: 40px;">The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</span></p>
    <h2><strong><span style="font-size: 70px;">Transfer of Your Personal Data</span></strong></h2>
    <p><span style="font-weight: 400; font-size: 40px;">Your information, including Personal Data, is processed at the Company&apos;s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to &mdash; and maintained on &mdash; computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</span></p>
    <h2><strong><span style="font-size: 70px;">Delete Your Personal Data</span></strong></h2>
    <p><span style="font-weight: 400; font-size: 40px;">You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Our Service may give You the ability to delete certain information about You from within the Service.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</span></p>
    <h2><span style="font-size: 70px;">Disclosure of Your Personal Data</span></h2>
    <h2><strong><span style="font-size: 50px;">Business Transactions</span></strong></h2>
    <p><span style="font-weight: 400; font-size: 40px;">If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.&nbsp;</span></p>
    <h2><strong><span style="font-size: 50px;">Law enforcement</span></strong></h2>
    <p><span style="font-weight: 400; font-size: 40px;">Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).&nbsp;</span></p>
    <h2><strong><span style="font-size: 50px;">Other legal requirements</span></strong></h2>
    <h3><span style="caret-color: rgb(0, 0, 0); color: rgb(0, 0, 0); font-family: -webkit-standard; font-size: 40px; font-style: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-size-adjust: auto; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration: none; display: inline !important; float: none;">&nbsp;The Company may disclose Your Personal Data in the good faith belief that such action is nessary to:</span>
        <ul>
            <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400; font-size: 30;">Comply with a legal obligation</span></li>
            <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400; font-size: 30;">Protect and defend the rights or property of the Company</span></li>
            <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400; font-size: 30;">Prevent or investigate possible wrongdoing in connection with the Service</span></li>
            <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400; font-size: 30;">Protect the personal safety of Users of the Service or the public</span></li>
            <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400; font-size: 30;">Protect against legal liability</span></li>
        </ul><strong><span style="font-size: 70px;">Security of Your Personal Data</span></strong>
    </h3>
    <h3><br><span style="font-weight: 400; font-size: 40px;">The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</span></h3>
    <p><strong><span style="font-size: 100px;">Children&apos;s Privacy</span></strong></p>
    <p><span style="font-weight: 400; font-size: 40px;">We primarily collect personal data about Children directly from Parents/Guardians/Schools, but we do collect some data from Children themselves such as avatar and leaderboard that other Children and users can view. We may collect feedback from Children about the TeeFi platform on what we can improve for better learning experiences.&nbsp;</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Children aged 18 years and younger are not permitted to create a Parent account on their own. Parents create the account for their children, and from the dashboard, children can modify or update their password and avatar.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Once Parents/Guardians/Schools create an account, they can set up Learner accounts for their Child. They may provide required information such as name, date of birth, avatar, username, password. These Child accounts, known as &quot;Learner Mode,&quot; have restrictions and limited permissions compared to the Parent/Guardian level.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Children are required to use Kids Login or Students Login to attend classes in videos, quizzes, stories, and games on TeeFi. Parents or teachers will provide the children with their own usernames and passwords for them to log in independently.&nbsp;</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">Parents/Guardians/Schools will receive email notifications for all Services, both paid and free, and have the ability to un-enroll their Children at any time. Parents/Guardians/Schools can always access and manage the Child Learner accounts but are not able to participate in Learner activities themselves.</span></p>
    <h1><br><strong><span style="font-size: 100px;">Links to Other Websites</span></strong></h1>
    <p><span style="font-weight: 400; font-size: 40px;">Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party&apos;s site. We strongly advise You to review the Privacy Policy of every site You visit.</span></p>
    <p><span style="font-weight: 400; font-size: 40px;">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</span></p>
    <p><br></p>
    <h1><span style="font-size: 100px;">Changes to this Privacy Policy</span></h1>
    <p><br></p>
    <p><span style="font-size: 40px;">We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</span></p>
    <p><span style="font-size: 40px;">We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</span></p>
    <p><span style="font-size: 40px;">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</span></p>
    <h1><strong><span style="font-size: 100px;">Contact Us</span></strong></h1>
    <p><span style="font-weight: 400; font-size: 40px;">If you have any questions about this Privacy Policy, You can contact us:</span></p>
    <ul>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400;">By email:&nbsp;</span><a href="mailto:help@teefi.io"><span style="font-weight: 400;">help@teefi.io</span></a></li>
        <li style="font-weight: 400; font-size: 40px;" aria-level="1"><span style="font-weight: 400;">Company Address: 68 Circular Road #02-01, 049422, Singapore</span></li>
    </ul>
</body>
</html>`;

  return (
    <View style={CONTAINER}>
      <Header onBackPress={() => navigation.goBack()} />
      <View style={CONTENT_ITEM}>
        <WebView source={{html: renderHTML}} startInLoadingState={true} />
      </View>
      <View style={{marginBottom: verticalScale(20)}} />
    </View>
  );
};

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.white,
};
const CONTENT_ITEM: ViewStyle = {
  flex: 1,
  marginTop: verticalScale(10),
  padding: 10,
};
