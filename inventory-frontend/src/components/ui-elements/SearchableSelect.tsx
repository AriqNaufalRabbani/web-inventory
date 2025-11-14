"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface Option {
  [key: string]: any;
}

interface SearchableSelectProps {
  apiUrl: string;
  name: string;
  value: string | number | null;
  onChange: (val: { name: string; value: any }) => void;
  labelKey?: string;
  valueKey?: string;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  apiUrl,
  name,
  value,
  onChange,
  labelKey = "label",
  valueKey = "value",
  placeholder = "Pilih...",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [filtered, setFiltered] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Fungsi fetch data API
  const fetchData = useCallback(async () => {
    if (options.length > 0) return;

    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      
      // Mengambil array data, baik dari root object atau properti 'data'
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];
      
      setOptions(list);
      setFiltered(list);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, options.length]);

  // 1. FETCH DATA ON MOUNT (Di awal, terlepas dari `open`)
  // Ini memastikan data tersedia untuk setting label awal
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. FILTER OPTIONS
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFiltered(
      options.filter((o) =>
        (o?.[labelKey] ?? "").toLowerCase().includes(lowerSearch)
      )
    );
    setHighlightIndex(-1); // reset highlight
  }, [search, options, labelKey]);

  // 3. UPDATE SELECTED LABEL (Saat `value` atau `options` berubah)
  // Ini akan berjalan ketika `value` diterima atau setelah `options` di-fetch.
  useEffect(() => {
    if (value != null && options.length > 0) {
      const current = options.find((o) => String(o[valueKey]) === String(value));
      setSelectedLabel(current ? current[labelKey] : "");
    } else if (value === null) {
      // Mereset label jika nilai diatur ke null
      setSelectedLabel("");
    }
  }, [value, options, labelKey, valueKey]);

  // 4. Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch(""); // Reset search when closing
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;

    if (filtered.length === 0 && e.key !== "Escape") return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filtered.length);
      // Scroll to view highlighted item
      if (listRef.current) {
        listRef.current.children[
          (highlightIndex + 1) % filtered.length
        ]?.scrollIntoView({ block: "nearest" });
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= 0 ? filtered.length - 1 : prev - 1
      );
      // Scroll to view highlighted item
      if (listRef.current) {
        listRef.current.children[
          highlightIndex <= 0 ? filtered.length - 1 : highlightIndex - 1
        ]?.scrollIntoView({ block: "nearest" });
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filtered.length) {
        const opt = filtered[highlightIndex];
        onChange({ name, value: opt[valueKey] });
        setSelectedLabel(opt[labelKey]);
        setOpen(false);
        setSearch("");
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
    }
  };

  // Handler saat item dipilih
  const handleSelect = (opt: Option) => {
    onChange({ name, value: opt[valueKey] });
    setSelectedLabel(opt[labelKey]);
    setOpen(false);
    setSearch("");
  };

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
    // Jika membuka, reset search
    if (!open) setSearch("");
  };

  return (
    <div ref={ref} className="relative w-full">
      {/* Hidden input untuk form submission */}
      {name && <input type="hidden" name={name} value={value ?? ""} />}

      <button
        type="button"
        onClick={handleButtonClick}
        className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-left focus:ring-2 focus:ring-blue-500 flex justify-between items-center border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary"
      >
        {loading ? (
          <span className="text-gray-500">Loading...</span>
        ) : selectedLabel ? (
          selectedLabel
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {/* Simple Chevron Icon */}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "transform rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari..."
            className="w-full px-3 py-2 border-b border-gray-200 focus:outline-none"
            autoFocus
            // Pastikan input fokus saat dropdown terbuka
            onFocus={(e) => e.target.select()}
          />

          <ul
            ref={listRef}
            className="max-h-48 overflow-y-auto"
          >
            {loading ? (
              <li className="px-3 py-2 text-gray-500">Loading...</li>
            ) : filtered.length > 0 ? (
              filtered.map((opt, index) => (
                <li
                  key={opt[valueKey]}
                  onClick={() => handleSelect(opt)}
                  className={`px-3 py-2 cursor-pointer ${
                    index === highlightIndex
                      ? "bg-blue-100"
                      : String(opt[valueKey]) === String(value)
                      ? "bg-blue-50 font-semibold"
                      : ""
                  } hover:bg-blue-100`}
                >
                  {opt[labelKey]}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">Tidak ada hasil</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;