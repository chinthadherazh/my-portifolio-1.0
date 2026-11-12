import React, { useState } from 'react';
import { BookOpen, GraduationCap, CheckCircle2, Clock, Calendar, ArrowRight } from 'lucide-react';
import { COURSES } from '../data/portfolioData';
import { Course } from '../types';

export const AcademicRoadmap: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0]);
  const [activeYearFilter, setActiveYearFilter] = useState<number>(1);

  const filteredCourses = COURSES.filter((c) => c.year === activeYearFilter);

  return (
    <section id="academics" className="py-20 bg-[#080B16] border-t border-purple-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400 font-mono tracking-wider">
            NIAT ACADEMIC PROGRESSION
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            B.Tech CSE (AI & ML) Curriculum
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A comprehensive undergraduate curriculum at NIAT combining Python, AI tools, modern web engineering, and foundational computing mathematics.
          </p>
        </div>

        {/* 4-Year Horizontal Degree Stepper */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              year: 1,
              title: 'Year 1: Python, HTML/CSS & AI Tools',
              status: 'Current · NIAT Campus',
              focus: 'Python, Web Tech, AI Tools, Math Foundations',
              active: true,
            },
            {
              year: 2,
              title: 'Year 2: Data Structures & Deep Learning',
              status: 'Upcoming · Sem 3 & 4',
              focus: 'Advanced DSA in Python/C++, Neural Networks',
              active: false,
            },
            {
              year: 3,
              title: 'Year 3: Applied Vision, NLP & Systems',
              status: 'Planned · Sem 5 & 6',
              focus: 'Computer Vision, Natural Language Processing, DBMS',
              active: false,
            },
            {
              year: 4,
              title: 'Year 4: Capstone Innovation & Thesis',
              status: 'Planned · Sem 7 & 8',
              focus: 'Civic AI Deployments, Research Thesis, Industry Tech',
              active: false,
            },
          ].map((item) => (
            <button
              key={item.year}
              onClick={() => {
                setActiveYearFilter(item.year);
                const firstMatching = COURSES.find((c) => c.year === item.year);
                if (firstMatching) setSelectedCourse(firstMatching);
              }}
              className={`text-left p-4 rounded-xl border transition-all ${
                activeYearFilter === item.year
                  ? 'glass-card border-purple-500/60 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900/30 border-purple-900/20 hover:border-purple-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-purple-400">
                  Year 0{item.year}
                </span>
                {item.active && (
                  <span className="text-[10px] font-mono text-emerald-400">
                    Active
                  </span>
                )}
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{item.focus}</p>
            </button>
          ))}
        </div>

        {/* Master Detail Grid: Course List & Course Detail Card */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Course List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between px-1">
              <span>MODULES IN YEAR {activeYearFilter}</span>
              <span className="text-purple-400">{filteredCourses.length} Subjects</span>
            </div>

            {filteredCourses.map((course) => {
              const isSelected = selectedCourse.code === course.code;
              return (
                <div
                  key={course.code}
                  onClick={() => setSelectedCourse(course)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'glass-card border-purple-500/60 shadow-md'
                      : 'bg-slate-900/40 border-purple-900/20 hover:border-purple-700/40 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono text-sky-400 font-semibold">
                      {course.code} · {course.semester}
                    </span>
                    <span className="text-[11px] font-mono text-purple-300">
                      {course.status === 'completed'
                        ? 'Completed'
                        : course.status === 'in-progress'
                        ? 'In Progress'
                        : 'Upcoming'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">
                    {course.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-2 border-t border-purple-900/20">
                    <span className="text-purple-300 font-sans">{course.score || 'Upcoming'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-sky-400' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Course Deep-Dive Card */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-purple-900/30">
              <div>
                <span className="text-xs font-mono text-sky-400 font-semibold block">
                  {selectedCourse.code} · {selectedCourse.semester}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedCourse.title}
                </h3>
              </div>
              {selectedCourse.score && (
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400 block">Performance</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    {selectedCourse.score}
                  </span>
                </div>
              )}
            </div>

            {/* Course Narrative */}
            <div className="space-y-2">
              <h5 className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                Overview & Applied Practice
              </h5>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedCourse.description}
              </p>
            </div>

            {/* Topics Covered */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                Key Topics Covered
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedCourse.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/70 rounded-lg border border-purple-500/10 text-xs font-mono text-slate-300 flex items-center gap-2"
                  >
                    <span className="text-sky-400 font-bold">0{idx + 1}.</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Textbook & Literature */}
            <div className="p-4 bg-slate-950/70 rounded-xl border border-purple-500/15 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-white block">
                  Core Reference Guide & Textbook
                </span>
                <span className="text-slate-300 font-mono">{selectedCourse.textbook}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
