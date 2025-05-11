const express = require("express");
const { crawl_dgujanghak } = require("./services/crawl_dgujanghak.js");
const { crawl_dgunotice } = require("./services/crawl_dgunotice.js");
const { fetchsite } = require("./services/crawl_linkareer.js");
const { saveAllPosts } = require("./services/dbsave.js");

const app = express();

//동국대학교 장학공지 
app.get('/dgu/janghak', async (req, res) => {
  try {
    result = await crawl_dgujanghak();
    await saveAllPosts(result);
    res.json(result);
  } catch (error) {
    console.error("LLM 처리 오류:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//동국대학교 일반공지  
app.get('/dgu/general', async (req, res) => {
  try {
    result = await crawl_dgunotice();
    await saveAllPosts(result);
    res.json(result);
  } catch (error) {
    console.error("LLM 처리 오류:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//링커리어  
app.get('/linkareer', async (req, res) => {
  try {
    result = await fetchsite();
    await saveAllPosts(result);
    res.json(result);
  } catch (error) {
    console.error("LLM 처리 오류:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running at http://localhost:3000');
});
