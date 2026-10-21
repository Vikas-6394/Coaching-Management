import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { StatusBadge } from '../../components/StatusBadge';
import { SearchFilter } from '../../components/SearchFilter';
import { Modal } from '../../components/Modal';
import {
  FileText,
  Download,
  Eye,
  FileCode,
  Video,
  FileSpreadsheet,
  BookOpen,
  User,
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const StudentStudyMaterials = () => {
  const { studyMaterials } = useData();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [previewMaterial, setPreviewMaterial] = useState(null);

  const subjects = useMemo(() => {
    return Array.from(new Set(studyMaterials.map(m => m.subject))).sort();
  }, [studyMaterials]);

  const filteredMaterials = useMemo(() => {
    return studyMaterials.filter(m => {
      const matchSearch =
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.courseName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSubject =
        selectedSubject === "All" || m.subject === selectedSubject;

      return matchSearch && matchSubject;
    });
  }, [studyMaterials, searchTerm, selectedSubject]);

  const handleDownload = (material) => {
    toast.success(
      `Downloading "${material.title}" (${material.size}). Saved to your demo downloads folder!`,
      "Download Started"
    );
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-rose-500" />;
      case 'Slides':
        return <FileSpreadsheet className="w-5 h-5 text-amber-500" />;
      case 'Video':
        return <Video className="w-5 h-5 text-blue-500" />;
      default:
        return <FileCode className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Study Materials & Digital Vault
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Access high-yield revision summaries, formula sheets, NCERT walkthroughs, and annotated lecture slides.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={subjects}
        selectedCategory={selectedSubject}
        onCategoryChange={setSelectedSubject}
        placeholder="Search notes by topic, faculty author, or formula..."
        totalCount={studyMaterials.length}
        filteredCount={filteredMaterials.length}
      />

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {getTypeIcon(item.type)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {item.type} • {item.size}
                  </span>
                </div>
                {item.badge && <StatusBadge status={item.badge} size="sm" />}
              </div>

              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {item.courseName}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {item.author}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5" /> {item.date}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewMaterial(item)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
              <button
                type="button"
                onClick={() => handleDownload(item)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Material Preview Modal */}
      {previewMaterial && (
        <Modal
          isOpen={!!previewMaterial}
          onClose={() => setPreviewMaterial(null)}
          title={`Document Preview: ${previewMaterial.title}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">{previewMaterial.subject} Revision Note</span>
                <span className="text-slate-400 font-mono">{previewMaterial.size} • {previewMaterial.type}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Authored by {previewMaterial.author}. Includes high-yield memory aids, standard solved examples, and step-by-step problem reduction formulas.
              </p>
            </div>

            {/* Document mockup content */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-4">
              <div className="border-b pb-3 border-slate-100 dark:border-slate-800">
                <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Section 1: Key Formulas & Identity Summary
                </h5>
              </div>
              <div className="space-y-2 text-slate-600 dark:text-slate-300 font-mono text-[11px] bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <p>1. Moment of Inertia (Rod about center): I_cm = (1/12) * M * L^2</p>
                <p>2. Parallel Axis Theorem: I = I_cm + M * d^2</p>
                <p>3. Angular Momentum: L = I * ω = r × p</p>
                <p>4. Rotational Kinetic Energy: KE = (1/2) * I * ω^2</p>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * Sample preview mode enabled. Click "Download Full PDF" for all 18 pages of detailed diagrams and solved exercise sheets.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setPreviewMaterial(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(previewMaterial);
                  setPreviewMaterial(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="w-3.5 h-3.5" /> Download Full Document
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
