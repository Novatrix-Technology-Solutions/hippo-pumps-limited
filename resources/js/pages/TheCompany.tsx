import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import { staggerContainer, staggerItem, fadeIn } from '@/Utils/animations';

export default function TheCompany({ auth }: PageProps) {
    return (
        <AnimatedPage>
            <Head title="The Company" />
            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-5 py-8"
            >
                <motion.div 
                    variants={fadeIn}
                    className="mb-4 text-sm text-[#004080]"
                >
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <span className="mx-2">＞</span>
                    <span>The company</span>
                </motion.div>

                <motion.h1 
                    variants={staggerItem}
                    className="text-4xl font-bold text-[#1e4785] mb-8"
                >
                    The company and the water challenges
                </motion.h1>

                <div className="flex flex-col md:flex-row gap-12 mb-16">
                    <motion.div 
                        variants={staggerItem}
                        className="md:w-1/2"
                    >
                        <h2 className="text-2xl italic text-[#e63946] mb-6">Be pumping partners</h2>

                        <div className="space-y-6 text-[#333333] text-lg leading-relaxed">
                            <p>
                                Global water challenges require excellence in pumping technologies and close cooperation between pump
                                designers, manufacturers, and pump engineers.
                            </p>
                            <p>
                                To better meet our customers' needs and requirements, our company is expanding its operations worldwide.
                                We already provide timely and effective services in more than 20 countries.
                            </p>
                            <p>
                                Hippo has developed a wide range of pumping solutions for many applications including building services,
                                mining, irrigation, and industrial processes. Our customers benefit from the highest performance in
                                booster sets and pressurization, fire-fighting sets, underground water pumping, HVAC systems, drainage and
                                sewage solutions, utilities, and OEM integrations.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div 
                        variants={staggerItem}
                        className="md:w-1/2"
                    >
                        <motion.img
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            src="/images/hippo-manufacturing-facility.jpg"
                            alt="Hippo Manufacturing Facility"
                            className="w-full h-auto rounded-xl shadow-lg"
                        />
                    </motion.div>
                </div>

                <motion.div 
                    variants={staggerItem}
                    className="space-y-6 text-[#333333] text-lg leading-relaxed mb-16"
                >
                    <p>
                        We have significant industrial capacity with production exceeding half a million units per year. At our
                        organization, we design high-efficiency centrifugal pumps using the best CFD, CAD, and FEA tools. We are proud
                        of our industrial facilities where we design and produce our own patterns and molds. We have vertically
                        integrated all manufacturing processes including foundry, machining, static and dynamic balance testing, and
                        hydraulic and electrical performance testing.
                    </p>
                </motion.div>

                <motion.div 
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    <motion.div 
                        variants={staggerItem}
                        className="bg-white p-8 rounded-xl shadow-lg border border-[#DDDDDD] hover:shadow-xl transition-shadow"
                    >
                        <h3 className="font-bold text-[#1e4785] text-2xl mb-4">Hippo's Code of Conduct</h3>
                        <p className="text-[#666666] text-base mb-6">
                            Hippo Board approved the Compliance document and its principles of government.
                        </p>
                        <p className="text-[#333333] text-lg leading-relaxed">
                            Hippo has compiled its commitment to ethics and legislation in relation to third parties in a public
                            document of principles. The document has been developed with the entire Hippo team, and its implementation
                            has begun with a committee that will ensure compliance and strengthen the company's business culture.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={staggerItem}
                        className="bg-white p-8 rounded-xl shadow-lg border border-[#DDDDDD] hover:shadow-xl transition-shadow"
                    >
                        <h3 className="font-bold text-[#1e4785] text-2xl mb-4">Hippo's Quality and Environment policies</h3>
                        <p className="text-[#666666] text-base mb-6">
                            The principles of the Quality and Environment Policy form the foundation of Hippo's management processes.
                        </p>
                        <p className="text-[#333333] text-lg leading-relaxed">
                            Hippo has adopted a policy centered on quality and environmental commitment to satisfy customers with
                            reliable and efficient products and services, made with the highest levels of quality and environmental
                            responsibility. To achieve this, the company focuses on processes that add value to customers and
                            shareholders, aiming to establish a center of excellence in quality, agility, flexibility, and environmental
                            protection and respect.
                        </p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatedPage>
    );
} 