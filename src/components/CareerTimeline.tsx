'use client'

import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2017–2019',
    role: 'IT Web & Multimedia',
    company: 'PT Netmediatama Televisi',
    type: 'fulltime',
  },
  {
    year: '2019–Now',
    role: 'Web Developer',
    company: 'PT Baezeni Digital Services',
    type: 'fulltime',
  },
  {
    year: '2020–Now',
    role: 'Freelance Web Developer',
    company: 'Various Clients',
    type: 'freelance',
  },
]

export function CareerTimeline() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-4 py-20"
    >
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* LEFT SIDE */}
        <div>
          <p className="text-sm italic text-gray-400 mb-2">Career Summary</p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            5+ Years of Experience — Crafting Digital Interfaces for People, Brands, and Businesses.
          </h2>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <motion.div
              key={item.role + item.year}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="border-l-4 pl-4 border-blue-500 bg-white rounded-lg shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.role}</h3>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    item.type === 'freelance'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {item.type === 'freelance' ? 'Freelance' : 'Full-Time'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.company}</p>
              <span className="text-xs text-gray-400">{item.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
