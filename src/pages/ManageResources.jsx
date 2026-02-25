import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Search, Filter, Globe, Lock } from 'lucide-react';

export default function ManageResources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        title: "Managing Exam Stress",
        description: "Tips for staying calm during finals.",
        category: "Mental Health",
        type: "article",
        content_url: "https://example.com/stress",
        is_published: 1
      },
      {
        id: 2,
        title: "10-Minute Morning Yoga",
        description: "A quick routine to start your day.",
        category: "Fitness",
        type: "video",
        content_url: "https://example.com/yoga",
        is_published: 1
      },
      {
        id: 3,
        title: "Healthy Meal Prep for Students",
        description: "Budget-friendly recipes.",
        category: "Nutrition",
        type: "pdf",
        content_url: "https://example.com/mealprep",
        is_published: 1
      },
      {
        id: 4,
        title: "Better Sleep Habits",
        description: "Improve your academic performance with rest.",
        category: "Sleep Improvement",
        type: "article",
        content_url: "https://example.com/sleep",
        is_published: 1
      }
    ];
  
    setResources(data);
  }, []);
  console.log("Resources:", resources);
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-medium text-stone-900">Curate the Sanctuary</h1>
          <p className="text-stone-500 mt-1 font-serif italic">Create, edit, and publish wellness content.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-100 hover:bg-teal-700 transition-all">
          <Plus size={20} />
          Add New Resource
        </button>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by title or category..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 border border-slate-200 rounded-xl">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {resources.map(res => (
                <tr key={res.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{res.title}</p>
                    <p className="text-xs text-slate-500 truncate max-w-xs">{res.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase">
                      {res.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 capitalize">{res.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    {res.is_published ? (
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                        <Globe size={14} /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                        <Lock size={14} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
