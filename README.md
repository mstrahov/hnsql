# SQLite powered HN who's hiring searcher and more

This is a cross between sqlite in a browser (sql.js) and hackernews API. 

Try here: https://mstrahov.github.io/hnsql/

Can be run locally by something like python3 -m http.server 8000


## Motivation: create a reliable searcher for HN Who's hiring thread in SQLite db stored locally. 

If you're looking for a job on who's hiring thread, SQL-as-interface for a searcher should be a natural choice  )) 

Just pass Who's hiring url as a parameter to load all top-level children comments, wait until all job posts are loaded to your own local SQLite db in a browser and run any full text search queries to find your dream job. 

Example: July 2022 Who's hiring thread: https://mstrahov.github.io/hnsql/?https://news.ycombinator.com/item?id=32306920 or just https://mstrahov.github.io/hnsql/?32306920

Save your db to a local file, restore db from a saved file. Comments from the last HN story in your db will be updated upon opening the file automatically. 

Alternatively, paste hn's link to SQL query text area and press "Load HN thread" button. It loads all first level comments to your local db. 

SQL query history and some useful examples can be accessed by pressing "SQL History". Just click on a query from a list to re-run it. "Exec to list" outputs query results to a list. It expects id and textfld columns to show comments properly, add byfld, timefld, seen and fldcheckbox for full functionality.

Click "Exec to table" to output results to a simple table. 

Features:


- Runs in a browser
- Runs fast and locally 
- No tracking
- SQLite full text search engine (fts4), run any query you want: https://www.sqlite.org/fts3.html
- Posts from HN are stored in SQLite db, can be modified by running regular queries against it in a browser
- Own your data: Ability to save database locally / restore from local file
  - it's just a regular SQLite, can be read and modified by any other tool
  - as long as the basic table structure remains the same, the modified db can be viewed on a page
- Not limited by pagination, simply run "select * from items" to see all posts on a same page
- Built-in helper functions if certain fields are included in query results
  - "seen" field - automatically adds IntersectionObserver to each item; when user sees comment's text on the screen, it automatically sets "seen" flag to 1 in db.  
    Add "where seen=0" to query to filter posts scrolled through previously.
  - "fldcheckbox" - adds a checkbox next to each post, when clicked, the checkbox's value is saved to db for bookmarking posts.
    Run something like "select * from items where fldcheckbox=1" to see saved items
- Display query results as comments' list or simple table
- Progress bar when loading comments
- Query history - click "SQL query" button and click on a query to run it
- Built-in query examples
- Existing story is refreshed automatically when a saved file is opened. 
- Unlimited stories are supported (paste HN links to SQL text field and click "Load HN thread" to load top comments)
- Deleted comments are marked as deleted=1
- TODO: track comments deleted after first loading
- TODO: load nested comments
- TODO: display a tree of nested comments


Technically, any hn comment thread can be loaded, however only top-level comments are currently supported.



                      
