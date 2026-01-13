import { Brain, Mail, Phone, MapPin, Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#011627] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Brain className="w-8 h-8 text-[#d94948]" />
                            <span className="text-2xl font-bold">AI Authority</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Empowering businesses with cutting-edge AI solutions that drive innovation and growth.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.linkedin.com/company/aiauthority/"
                                className="bg-white/10 hover:bg-[#d94948] p-2 rounded-lg transition-colors duration-300"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="bg-white/10 hover:bg-[#d94948] p-2 rounded-lg transition-colors duration-300"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="bg-white/10 hover:bg-[#d94948] p-2 rounded-lg transition-colors duration-300"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    
                    {/* Menu Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Menu</h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#home"
                                    className="text-gray-400 hover:text-[#d94948] transition-colors duration-300"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="text-gray-400 hover:text-[#d94948] transition-colors duration-300"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    className="text-gray-400 hover:text-[#d94948] transition-colors duration-300"
                                >
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#certification"
                                    className="text-gray-400 hover:text-[#d94948] transition-colors duration-300"
                                >
                                    Certification
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#membership"
                                    className="text-gray-400 hover:text-[#d94948] transition-colors duration-300"
                                >
                                    Membership
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className="text-gray-400 hover:text-[#d94948] transition-colors duration-300"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-[#d94948] flex-shrink-0 mt-0.5" />
                                <a 
                                    href="mailto:info@ai-authority.ai" 
                                    className="text-gray-400 hover:text-[#d94948] transition-colors duration-300"
                                >
                                    info@ai-authority.ai
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-[#d94948] flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400">+1 248-719-2613</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-[#d94948] flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400">
                                    850 Stephenson hwy Suite 205 Troy,
                                    <br />
                                    MI 48083
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © 2024 AI Authority. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <p className="text-gray-400 text-sm">
                                Powered by AI Authority
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
