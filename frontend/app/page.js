"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import VisibilityTrendChart from "../components/VisibilityTrendChart";

// ---------------------------
// Supabase Client
// ---------------------------
const supabaseUrl = "https://kkqywsisqscabqwbnirj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrcXl3c2lzcXNjYWJxd2JuaXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODg3NjcsImV4cCI6MjA3NjE2NDc2N30.Vlj8V1snr6bDBimtwjZwc7D_uTgiqgOOxI2bq42UqxU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  // ---------------------------
  // State
  // ---------------------------
  const [websites, setWebsites] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [visibilityChecks, setVisibilityChecks] = useState([]);
  const [filterEngine, setFilterEngine] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [trendData, setTrendData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // ---------------------------
  // Fetch Websites and Keywords
  // ---------------------------
  useEffect(() => {
    async function fetchData() {
      const { data: ws, error: wsError } = await supabase.from("websites").select("*");
      if (wsError) console.error(wsError);
      else setWebsites(ws || []);

      const { data: kw, error: kwError } = await supabase.from("keywords").select("*");
      if (kwError) console.error(kwError);
      else setKeywords(kw || []);
    }
    fetchData();
  }, []);

  // ---------------------------
  // Fetch visibility checks + auto-refresh
  // ---------------------------
  useEffect(() => {
    let interval;

    async function fetchVisibility() {
      const { data, error } = await supabase
        .from("visibility_checks")
        .select("id, keyword_id, ai_engine, visible, visibility_score, checked_at")
        .order("checked_at", { ascending: true });

      if (error) console.error(error);
      else {
        setVisibilityChecks(data || []);
        setLastUpdated(new Date());
      }
    }

    // Initial fetch
    fetchVisibility();

    // Refresh every 5 minutes
    interval = setInterval(fetchVisibility, 300000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // ---------------------------
  // Prepare trend data for chart
  // ---------------------------
  useEffect(() => {
    const filteredChecks = visibilityChecks.filter((vc) => {
      if (selectedKeyword && vc.keyword_id !== selectedKeyword) return false;
      if (selectedWebsite) {
        const kw = keywords.find((k) => k.id === vc.keyword_id);
        if (!kw || kw.website_id !== selectedWebsite) return false;
      }
      return true;
    });

    const grouped = {};
    filteredChecks.forEach((row) => {
      const date = row.checked_at.split("T")[0];
      if (!grouped[date]) grouped[date] = { checked_at: date };
      grouped[date][row.ai_engine] = row.visibility_score;
    });

    setTrendData(Object.values(grouped));
  }, [visibilityChecks, selectedWebsite, selectedKeyword, keywords]);

  // ---------------------------
  // Filter and search for display
  // ---------------------------
  const filteredKeywords = keywords.filter((k) =>
    searchKeyword ? k.keyword.toLowerCase().includes(searchKeyword.toLowerCase()) : true
  );

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Search Visibility Tracker</h1>

      {/* ------------------- */}
      {/* Filters + Reset */}
      {/* ------------------- */}
      <div className="mb-2 flex flex-wrap gap-4 items-center">
        {/* Filter by AI Engine */}
        <div>
          <label className="mr-2 font-medium">Filter by AI Engine:</label>
          <select
            value={filterEngine}
            onChange={(e) => setFilterEngine(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All AI Engines</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Gemini">Gemini</option>
          </select>
        </div>

        {/* Search Keyword */}
        <div>
          <label className="mr-2 font-medium">Search Keywords:</label>
          <input
            type="text"
            placeholder="Enter keyword..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* Select Website */}
        <div>
          <label className="mr-2 font-medium">Select Website:</label>
          <select
            value={selectedWebsite}
            onChange={(e) => setSelectedWebsite(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Websites</option>
            {websites.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Keyword */}
        <div>
          <label className="mr-2 font-medium">Select Keyword:</label>
          <select
            value={selectedKeyword}
            onChange={(e) => setSelectedKeyword(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Keywords</option>
            {keywords.map((k) => (
              <option key={k.id} value={k.id}>
                {k.keyword}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <div>
          <button
            onClick={() => {
              setFilterEngine("");
              setSearchKeyword("");
              setSelectedWebsite("");
              setSelectedKeyword("");
            }}
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* ------------------- */}
      {/* Last Updated Timestamp */}
      {/* ------------------- */}
      {lastUpdated && (
        <p className="text-sm text-gray-500 mb-2">
          Last updated: {lastUpdated.toLocaleString()}
        </p>
      )}

      {/* ------------------- */}
      {/* Visibility Trend Chart */}
      {/* ------------------- */}
      <VisibilityTrendChart data={trendData} />

      {/* ------------------- */}
      {/* Website & Keywords List */}
      {/* ------------------- */}
      <div className="mt-6">
        {websites.map((w) => (
          <div key={w.id} className="mb-4 border p-3 rounded shadow-sm">
            <a
              href={w.url}
              className="font-semibold text-blue-600"
              target="_blank"
              rel="noreferrer"
            >
              {w.name}
            </a>

            {filteredKeywords
              .filter((k) => k.website_id === w.id)
              .map((v) => {
                const checksForKeyword = visibilityChecks.filter(
                  (vc) => vc.keyword_id === v.id
                );

                return (
                  <div key={v.id} className="ml-4 mt-2">
                    {checksForKeyword
                      .filter((c) => !filterEngine || c.ai_engine === filterEngine)
                      .map((vc) => (
                        <div key={vc.id}>
                          <span style={{ color: vc.visible ? "green" : "red" }}>
                            {vc.ai_engine}: {vc.visible ? "✅" : "❌"} ({vc.visibility_score})
                          </span>
                        </div>
                      ))}
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
