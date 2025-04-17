import React from "react";

const AboutUs = () => {
    return (
        <>
            <div className="mt-20">


                <div className="bg-white py-12">
                    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                        {/* Content */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                Our Story
                            </h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                In founding Landmark Construction, it was my dream to build an environment that fosters
                                and rewards everyone’s achievements and pride in all aspects of the company’s efforts. I
                                felt that if the company could focus its attention on creating a unique bond with every
                                employee-owner, they would create a positive client relationship based on our core
                                values at every level in the company. I’m very proud of what we have accomplished
                                together, and I am excited to see what’s next.
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Selvaraj</strong> – Founder, Chairman
                            </p>
                        </div>

                        {/* Image */}
                        <div className="flex-1">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/009/174/438/large_2x/engineer-man-working-in-building-site-young-worker-man-working-in-construction-site-construction-and-civil-engineer-concept-photo.JPG"
                                alt="Our Story"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>


                <div className="bg-white py-12">
                    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                        {/* Image */}
                        <div className="flex-1">
                            <img
                                src="https://i0.wp.com/osmacom.com/wp-content/uploads/2021/08/two-colleagues-edited-2.jpg?fit=%2C&ssl=1"
                                alt="Our Mission & Purpose"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                Our Mission & Purpose
                            </h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                Since our founding, Landmark has grown immensely while maintaining the focus on our
                                people that Mike Clune initiated. As we continue to evolve, we know that our strengths
                                are rooted in our shared fate. Increasing goals, expanding footprint, and working in new
                                markets all require people across our organization to think, act, and grow
                                collaboratively toward the same purpose. These efforts can only succeed in an
                                environment of trust, where safety, service, teamwork, respect, excellence, leadership,
                                and innovation are the core values. My job as CEO is to create the conditions where
                                these principles are at the forefront of what we do every day so that we are all in
                                pursuit of a perfect project for our clients and team members.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="bg-white py-12">
                    <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                        {/* Content */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                TEAMWORK
                            </h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                At Landmark, teamwork is the foundation of every successful project. We work with
                                architects, project managers, trade partners, clients and stakeholders to bring each
                                project to life. Our culture of co-leadership and cross-departmental collaboration,
                                spanning every regional office, fosters an environment where diverse perspectives
                                thrive.
                            </p>
                            <p className="text-sm text-gray-500">

                            </p>
                        </div>

                        {/* Image */}
                        <div className="flex-1">
                            <img
                                src="https://www.shutterstock.com/image-photo/engineer-team-hand-front-building-260nw-789139726.jpg"
                                alt="Our Story"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/*<div className="bg-gray-100 py-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-bold text-red-600 mb-4">LANDMARK CONSTRUCTION</h1>
                        <p className="text-gray-700">
                            Copyright © 2025 Landmark Construction Company. All rights reserved.
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                            Landmark Projects, No.55J, Dharapuram Road, Cheran Nagar, Vellakovil-638111,
                            Kangayam(TK), Tirupur(DT).
                        </p>
                    </div>
                </div>*/}

                <footer className="bg-gray-100 py-12">
                    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <h3 className="text-red-600 font-bold mb-4">LANDMARK CONSTRUCTION</h3>
                            <p className="text-gray-700 text-sm">
                                Copyright © 2025 Landmark Construction Company. All rights reserved.
                            </p>
                            <p className="text-gray-600 text-xs mt-2">
                                Landmark Projects, No.55J, Dharapuram Road, Cheran Nagar, Vellakovil-638111,
                                Kangayam(TK), Tirupur(DT).
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-red-600 font-bold mb-4">QUICK LINKS</h3>
                            <a href="#" className="text-gray-700 block mb-2">Who We Are</a>
                            <a href="#" className="text-gray-700 block mb-2">News & Insights</a>
                            <a href="#" className="text-gray-700 block mb-2">Contact</a>
                            <a href="#" className="text-gray-700 block mb-2">Transparency in Coverage</a>
                            <a href="#" className="text-gray-700 block mb-2">Privacy Policy</a>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-red-600 font-bold mb-4">SOCIAL</h3>
                            <a href="#" className="text-gray-700 block mb-2">LinkedIn</a>
                            <a href="#" className="text-gray-700 block mb-2">Instagram</a>
                            <a href="#" className="text-gray-700 block mb-2">Facebook</a>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-red-600 font-bold mb-4">CONTACT</h3>
                            <a href="#" className="text-gray-700 block mb-2">National Presence</a>
                            <a href="#" className="text-gray-700 block mb-2">Media Inquiries</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default AboutUs;