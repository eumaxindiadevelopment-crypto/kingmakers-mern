import React from 'react';
import TopBar from '../header/TopBar';
import HeaderMiddle from '../header/HeaderMiddle';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import '../../css/privacy-policy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-layout">
            <TopBar />
            <HeaderMiddle />
            <Navbar />
            
            {/* Hero Section */}
            <section className="privacy-policy-hero">
                <div className="privacy-policy-hero-content">
                    <h1>Privacy Policy</h1>
                    <p>Your Privacy Matters to Us</p>
                    <div className="hero-accent"></div>
                    <p className="hero-description">
                        At Kingmakers IAS Academy, we are committed to protecting your personal information and your right to privacy.
                    </p>
                </div>
            </section>

            <main className="privacy-policy-content">
                <div className="container">
                    <section className="privacy-section">
                        <p>
                            Kingmakers IAS Academy ("we," "us," "our," or "Company") operates the KingMakers IAS Academy website (the "Service"). 
                            This Privacy Policy describes how we collect, use, disclose, and otherwise handle your personal information when you use our Service.
                        </p>
                    </section>

                    {/* Interpretation and Definitions */}
                    <section className="privacy-section">
                        <h2>1. Interpretation and Definitions</h2>
                        
                        <h3>Interpretation</h3>
                        <p>
                            The words of which the initial letter is capitalized have meanings defined under the following conditions. 
                            The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                        </p>

                        <h3>Definitions</h3>
                        <ul className="definitions-list">
                            <li><strong>Account:</strong> A unique account created for you to access our Service or parts of our Service.</li>
                            <li><strong>Affiliate:</strong> An entity that controls, is controlled by, or is under common control with a party.</li>
                            <li><strong>Company:</strong> KingMakers Institute Pvt Ltd, W4, 5th Main Road, Anna Nagar, Chennai – 600040.</li>
                            <li><strong>Cookies:</strong> Small files placed on your device by a website, containing details of your browsing history.</li>
                            <li><strong>Country:</strong> Tamil Nadu, India.</li>
                            <li><strong>Device:</strong> Any device that can access the Service such as a computer, cellphone, or digital tablet.</li>
                            <li><strong>Personal Data:</strong> Any information that relates to an identified or identifiable individual.</li>
                            <li><strong>Service:</strong> The Website and all associated services.</li>
                            <li><strong>Service Provider:</strong> Any natural or legal person who processes data on behalf of the Company.</li>
                            <li><strong>Usage Data:</strong> Data collected automatically from your use of the Service.</li>
                            <li><strong>Website:</strong> KingMakers IAS Academy, accessible from <a href="https://kingmakersiasacademy.com">https://kingmakersiasacademy.com</a></li>
                            <li><strong>You:</strong> The individual accessing or using the Service.</li>
                        </ul>
                    </section>

                    {/* Collecting and Using Personal Data */}
                    <section className="privacy-section">
                        <h2>2. Collecting and Using Your Personal Data</h2>

                        <h3>Types of Data Collected</h3>

                        <h4>Personal Data</h4>
                        <p>
                            While using our Service, we may ask you to provide us with certain personally identifiable information that can be used 
                            to contact or identify you. This may include:
                        </p>
                        <ul>
                            <li>Email address</li>
                            <li>First name and last name</li>
                            <li>Phone number</li>
                            <li>Address</li>
                            <li>Usage Data and communication history</li>
                        </ul>

                        <h4>Usage Data</h4>
                        <p>
                            Usage Data is collected automatically when using the Service and may include:
                        </p>
                        <ul>
                            <li>Your Device's Internet Protocol (IP) address</li>
                            <li>Browser type and version</li>
                            <li>Pages you visit on our Service</li>
                            <li>Time and date of your visit</li>
                            <li>Time spent on pages</li>
                            <li>Unique device identifiers</li>
                            <li>Diagnostic data about your device and browser</li>
                        </ul>

                        <h4>Tracking Technologies and Cookies</h4>
                        <p>
                            We use cookies and similar tracking technologies to track activity on our Service and store certain information. 
                            These technologies include:
                        </p>
                        <ul>
                            <li><strong>Cookies:</strong> Small files placed on your device. You can instruct your browser to refuse cookies, 
                            but this may prevent you from using some features of our Service.</li>
                            <li><strong>Web Beacons:</strong> Small electronic files that permit us to count users and verify website statistics.</li>
                        </ul>
                        <p>
                            We use both Session and Persistent Cookies for security, functionality, and user experience purposes.
                        </p>
                    </section>

                    {/* Use of Personal Data */}
                    <section className="privacy-section">
                        <h3>Use of Your Personal Data</h3>
                        <p>We may use your Personal Data for the following purposes:</p>
                        <ul>
                            <li>To provide and maintain our Service</li>
                            <li>To manage your Account and registration</li>
                            <li>For contract performance and purchase-related communications</li>
                            <li>To contact you regarding updates, support, and security notices</li>
                            <li>To provide promotional content and special offers</li>
                            <li>To manage your requests and inquiries</li>
                            <li>For business transfers and transactions</li>
                            <li>For data analysis, usage trends, and service improvement</li>
                        </ul>
                    </section>

                    {/* Retention and Security */}
                    <section className="privacy-section">
                        <h3>Retention of Your Personal Data</h3>
                        <p>
                            We will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. 
                            We will retain and use your data to comply with legal obligations, resolve disputes, and enforce agreements. 
                            Usage Data is generally retained for shorter periods unless needed for security or functionality improvements.
                        </p>

                        <h3>Security of Your Personal Data</h3>
                        <p>
                            The security of your Personal Data is important to us. However, no method of transmission over the Internet 
                            is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee 
                            its absolute security. You use the Service at your own risk.
                        </p>
                    </section>

                    {/* Transfer and Deletion */}
                    <section className="privacy-section">
                        <h3>Transfer of Your Personal Data</h3>
                        <p>
                            Your information may be transferred to and maintained on computers located outside your jurisdiction. 
                            Your consent to this Privacy Policy followed by submission of such information represents your agreement to this transfer. 
                            We will take all necessary steps to ensure your data is treated securely in accordance with this Privacy Policy.
                        </p>

                        <h3>Delete Your Personal Data</h3>
                        <p>
                            You have the right to delete or request assistance in deleting your Personal Data. Our Service may allow you to delete 
                            certain information from within your Account. You may also contact us to request access to, correct, or delete any 
                            personal information. Please note we may need to retain certain information when required by law.
                        </p>
                    </section>

                    {/* Disclosure and Legal */}
                    <section className="privacy-section">
                        <h2>3. Disclosure of Your Personal Data</h2>
                        
                        <h3>Business Transactions</h3>
                        <p>
                            If the Company is involved in a merger, acquisition, or asset sale, your Personal Data may be transferred. 
                            We will provide notice before your data is transferred and becomes subject to a different Privacy Policy.
                        </p>

                        <h3>Law Enforcement and Legal Requirements</h3>
                        <p>
                            The Company may be required to disclose your Personal Data if required by law or valid requests by public authorities. 
                            We may also disclose your data in good faith if necessary to:
                        </p>
                        <ul>
                            <li>Comply with legal obligations</li>
                            <li>Protect and defend the rights or property of the Company</li>
                            <li>Prevent or investigate wrongdoing</li>
                            <li>Protect personal safety of users or the public</li>
                            <li>Protect against legal liability</li>
                        </ul>
                    </section>

                    {/* Children's Privacy */}
                    <section className="privacy-section">
                        <h2>4. Children's Privacy</h2>
                        <p>
                            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information 
                            from children under 13. If you are a parent or guardian and aware that your child has provided us with Personal Data, 
                            please contact us. If we become aware that we have collected data from anyone under 13 without parental consent, 
                            we will take steps to remove that information from our servers.
                        </p>
                    </section>

                    {/* External Links */}
                    <section className="privacy-section">
                        <h2>5. Links to Other Websites</h2>
                        <p>
                            Our Service may contain links to other websites not operated by us. If you click on a third-party link, 
                            you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. 
                            We have no control over and assume no responsibility for the content, privacy policies, or practices of third-party sites 
                            or services.
                        </p>
                    </section>

                    {/* Changes to Policy */}
                    <section className="privacy-section">
                        <h2>6. Changes to this Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
                            on this page and updating the "Last updated" date. We will let you know via email and/or a prominent notice on our Service 
                            prior to the change becoming effective. You are advised to review this Privacy Policy periodically for any changes.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="privacy-section privacy-contact">
                        <h2>7. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, you can contact us:</p>
                        
                        <div className="contact-methods">
                            <div className="contact-method">
                                <h3>By Email</h3>
                                <p><a href="mailto:kingmakersiasacademy@gmail.com">kingmakersiasacademy@gmail.com</a></p>
                            </div>
                            <div className="contact-method">
                                <h3>By Phone</h3>
                                <ul>
                                    <li><a href="tel:+919444227273">+91 94442 27273</a> (UPSC)</li>
                                    <li><a href="tel:+918608227273">+91 86082 27273</a> (Banking)</li>
                                    <li><a href="tel:+919940567273">+91 99405 67273</a></li>
                                </ul>
                            </div>
                            <div className="contact-method">
                                <h3>By Mail</h3>
                                <p>
                                    KingMakers Institute Pvt Ltd<br />
                                    W4, 5th Main Road<br />
                                    Anna Nagar, Chennai – 600040<br />
                                    India
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
