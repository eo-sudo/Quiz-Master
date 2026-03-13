const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// ─── QUESTION BANK ───────────────────────────────────────────────────────────

const QUESTIONS = {
  "🔬 Science": [
    { q: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Go"], answer: 0 },
    { q: "How many bones are in the adult human body?", options: ["196", "206", "216", "226"], answer: 1 },
    { q: "What planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], answer: 2 },
    { q: "What is the speed of light (approx) in km/s?", options: ["150,000", "200,000", "300,000", "400,000"], answer: 2 },
    { q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
    { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], answer: 2 },
    { q: "How many chromosomes do humans have?", options: ["23", "44", "46", "48"], answer: 2 },
    { q: "What element has the atomic number 1?", options: ["Helium", "Hydrogen", "Carbon", "Lithium"], answer: 1 },
    { q: "What is the hardest natural substance on Earth?", options: ["Iron", "Quartz", "Diamond", "Titanium"], answer: 2 },
    { q: "Which organ produces insulin?", options: ["Liver", "Kidney", "Pancreas", "Stomach"], answer: 2 },
    { q: "What force keeps planets in orbit?", options: ["Magnetism", "Friction", "Gravity", "Electrostatics"], answer: 2 },
    { q: "What is water's chemical formula?", options: ["HO", "H2O", "H3O", "H2O2"], answer: 1 },
    { q: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], answer: 2 },
    { q: "What blood type is the universal donor?", options: ["A+", "B-", "O-", "AB+"], answer: 2 },
    { q: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], answer: 1 },
    { q: "What organ is responsible for pumping blood?", options: ["Lungs", "Liver", "Heart", "Brain"], answer: 2 },
    { q: "What is the boiling point of water in Celsius?", options: ["90°C", "95°C", "100°C", "110°C"], answer: 2 },
    { q: "Which vitamin is produced when exposed to sunlight?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"], answer: 2 },
    { q: "What is the largest organ in the human body?", options: ["Liver", "Skin", "Brain", "Lungs"], answer: 1 },
    { q: "What is DNA short for?", options: ["Deoxyribonucleic Acid", "Dynamic Nucleic Array", "Double Nucleus Acid", "None"], answer: 0 },
    { q: "What galaxy is Earth part of?", options: ["Andromeda", "Triangulum", "Milky Way", "Sombrero"], answer: 2 },
    { q: "What is the smallest unit of matter?", options: ["Molecule", "Cell", "Atom", "Electron"], answer: 2 },
    { q: "How many chambers does the human heart have?", options: ["2", "3", "4", "5"], answer: 2 },
    { q: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: 1 },
    { q: "What is the chemical formula for salt?", options: ["KCl", "NaCl", "MgCl", "CaCl"], answer: 1 },
  ],

  "🌍 Geography": [
    { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: 2 },
    { q: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
    { q: "Which country has the most natural lakes?", options: ["Russia", "USA", "Brazil", "Canada"], answer: 3 },
    { q: "What is the smallest country in the world?", options: ["Monaco", "Nauru", "Vatican City", "San Marino"], answer: 2 },
    { q: "Which desert is the largest in the world?", options: ["Gobi", "Sahara", "Arabian", "Antarctic"], answer: 3 },
    { q: "What is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], answer: 2 },
    { q: "Which continent is the largest by area?", options: ["Africa", "North America", "Asia", "Europe"], answer: 2 },
    { q: "What is the capital of Japan?", options: ["Osaka", "Kyoto", "Hiroshima", "Tokyo"], answer: 3 },
    { q: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
    { q: "What country is the Amazon rainforest primarily in?", options: ["Colombia", "Peru", "Brazil", "Venezuela"], answer: 2 },
    { q: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: 2 },
    { q: "Which African country has the most pyramids?", options: ["Egypt", "Ethiopia", "Sudan", "Libya"], answer: 2 },
    { q: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], answer: 2 },
    { q: "Which country has the most population?", options: ["USA", "India", "China", "Indonesia"], answer: 1 },
    { q: "What is the largest country by area?", options: ["Canada", "USA", "China", "Russia"], answer: 3 },
    { q: "The Great Barrier Reef is located near which country?", options: ["New Zealand", "Philippines", "Australia", "Indonesia"], answer: 2 },
    { q: "What country does the Eiffel Tower belong to?", options: ["Italy", "Spain", "France", "Belgium"], answer: 2 },
    { q: "Which river flows through Egypt?", options: ["Congo", "Niger", "Nile", "Zambezi"], answer: 2 },
    { q: "What is the capital of South Korea?", options: ["Busan", "Incheon", "Seoul", "Daegu"], answer: 2 },
    { q: "What is the currency of Japan?", options: ["Yuan", "Won", "Yen", "Baht"], answer: 2 },
    { q: "Which country has the longest coastline?", options: ["Russia", "USA", "Norway", "Canada"], answer: 3 },
    { q: "What is the capital of Germany?", options: ["Munich", "Hamburg", "Frankfurt", "Berlin"], answer: 3 },
    { q: "Which mountain range separates Europe and Asia?", options: ["Alps", "Urals", "Caucasus", "Himalayas"], answer: 1 },
    { q: "What country is the Sahara Desert mostly in?", options: ["Libya", "Algeria", "Chad", "It spans many"], answer: 3 },
    { q: "What is the capital of Argentina?", options: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"], answer: 2 },
  ],

  "📜 History": [
    { q: "In what year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
    { q: "Who was the first US President?", options: ["John Adams", "Thomas Jefferson", "George Washington", "James Madison"], answer: 2 },
    { q: "What ancient wonder was in Alexandria?", options: ["Hanging Gardens", "Colossus", "The Lighthouse", "Temple of Artemis"], answer: 2 },
    { q: "In what year did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], answer: 2 },
    { q: "Who painted the Mona Lisa?", options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"], answer: 2 },
    { q: "What empire was Julius Caesar part of?", options: ["Greek", "Ottoman", "Roman", "Byzantine"], answer: 2 },
    { q: "The first Moon landing was in which year?", options: ["1965", "1967", "1969", "1971"], answer: 2 },
    { q: "Who wrote the Declaration of Independence?", options: ["Benjamin Franklin", "George Washington", "Thomas Jefferson", "John Adams"], answer: 2 },
    { q: "What city was the atomic bomb first dropped on?", options: ["Tokyo", "Nagasaki", "Osaka", "Hiroshima"], answer: 3 },
    { q: "In what year did the Titanic sink?", options: ["1910", "1911", "1912", "1913"], answer: 2 },
    { q: "Who was the first woman to win a Nobel Prize?", options: ["Rosa Parks", "Marie Curie", "Amelia Earhart", "Florence Nightingale"], answer: 1 },
    { q: "What ancient civilization built the pyramids?", options: ["Greek", "Roman", "Egyptian", "Mesopotamian"], answer: 2 },
    { q: "The French Revolution began in what year?", options: ["1779", "1783", "1789", "1792"], answer: 2 },
    { q: "Who was Adolf Hitler's political party?", options: ["Communist", "Fascist", "Nazi", "Socialist"], answer: 2 },
    { q: "What war was fought between the North and South USA?", options: ["Revolutionary War", "War of 1812", "Civil War", "Spanish-American War"], answer: 2 },
    { q: "Who was the first to circumnavigate the globe?", options: ["Columbus", "Vespucci", "Magellan", "Drake"], answer: 2 },
    { q: "What year did World War I begin?", options: ["1912", "1913", "1914", "1915"], answer: 2 },
    { q: "Which country was Nelson Mandela from?", options: ["Nigeria", "Kenya", "South Africa", "Zimbabwe"], answer: 2 },
    { q: "The Renaissance period started in which country?", options: ["France", "Spain", "England", "Italy"], answer: 3 },
    { q: "Who invented the telephone?", options: ["Edison", "Tesla", "Bell", "Marconi"], answer: 2 },
    { q: "What was the name of the ship Darwin sailed on?", options: ["Endeavour", "Beagle", "Discovery", "Resolution"], answer: 1 },
    { q: "In what year did India gain independence?", options: ["1945", "1946", "1947", "1948"], answer: 2 },
    { q: "Who was the first female Prime Minister of UK?", options: ["Theresa May", "Margaret Thatcher", "Elizabeth II", "Mary Tudor"], answer: 1 },
    { q: "What was the longest reigning dynasty in China?", options: ["Tang", "Ming", "Zhou", "Han"], answer: 2 },
    { q: "The Colosseum is located in which city?", options: ["Athens", "Cairo", "Rome", "Paris"], answer: 2 },
  ],

  "⚽ Sports": [
    { q: "How many players are on a soccer team on the field?", options: ["9", "10", "11", "12"], answer: 2 },
    { q: "Which country has won the most FIFA World Cups?", options: ["Argentina", "Germany", "Italy", "Brazil"], answer: 3 },
    { q: "How many rings are on the Olympic flag?", options: ["4", "5", "6", "7"], answer: 1 },
    { q: "In basketball, how many points is a free throw?", options: ["1", "2", "3", "0"], answer: 0 },
    { q: "Which sport uses a puck?", options: ["Cricket", "Polo", "Ice Hockey", "Lacrosse"], answer: 2 },
    { q: "How many players are in a rugby union team?", options: ["13", "14", "15", "16"], answer: 2 },
    { q: "What country invented the sport of cricket?", options: ["Australia", "India", "England", "South Africa"], answer: 2 },
    { q: "In tennis, what is the score after 40-40?", options: ["Tiebreak", "Deuce", "Advantage", "Match"], answer: 1 },
    { q: "How many holes are in a standard golf course?", options: ["12", "16", "18", "20"], answer: 2 },
    { q: "Which sport is played at Wimbledon?", options: ["Squash", "Badminton", "Tennis", "Table Tennis"], answer: 2 },
    { q: "What country are the All Blacks rugby team from?", options: ["Australia", "South Africa", "England", "New Zealand"], answer: 3 },
    { q: "How long is a marathon in kilometers?", options: ["40km", "42.195km", "44km", "45km"], answer: 1 },
    { q: "What sport does Serena Williams play?", options: ["Golf", "Basketball", "Tennis", "Gymnastics"], answer: 2 },
    { q: "How many periods are in an ice hockey game?", options: ["2", "3", "4", "5"], answer: 1 },
    { q: "What is the highest score achievable in bowling?", options: ["200", "250", "300", "350"], answer: 2 },
    { q: "In which sport can you score a 'birdie'?", options: ["Cricket", "Baseball", "Golf", "Badminton"], answer: 2 },
    { q: "What is the national sport of Japan?", options: ["Karate", "Judo", "Sumo", "Kendo"], answer: 2 },
    { q: "How many players are on a volleyball team?", options: ["5", "6", "7", "8"], answer: 1 },
    { q: "What country did Usain Bolt represent?", options: ["USA", "Trinidad", "Jamaica", "Bahamas"], answer: 2 },
    { q: "How many sets in a men's Grand Slam tennis match?", options: ["3", "4", "5", "6"], answer: 2 },
    { q: "What is the diameter of a basketball hoop in inches?", options: ["16", "18", "20", "22"], answer: 1 },
    { q: "Which swimmer has the most Olympic gold medals ever?", options: ["Ian Thorpe", "Ryan Lochte", "Mark Spitz", "Michael Phelps"], answer: 3 },
    { q: "In baseball, how many strikes for a strikeout?", options: ["2", "3", "4", "5"], answer: 1 },
    { q: "What year were the first modern Olympics held?", options: ["1892", "1894", "1896", "1900"], answer: 2 },
    { q: "Which F1 driver has the most World Championships?", options: ["Ayrton Senna", "Michael Schumacher", "Lewis Hamilton", "Sebastian Vettel"], answer: 2 },
  ],

  "🎬 Movies & TV": [
    { q: "Who directed Jurassic Park?", options: ["James Cameron", "Steven Spielberg", "Ridley Scott", "George Lucas"], answer: 1 },
    { q: "What is the highest-grossing film of all time?", options: ["Avengers: Endgame", "Titanic", "Avatar", "Top Gun Maverick"], answer: 2 },
    { q: "In Friends, what is the name of Ross's monkey?", options: ["Eddie", "Marcel", "Caesar", "Bruno"], answer: 1 },
    { q: "Who played Iron Man in the MCU?", options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"], answer: 2 },
    { q: "What is the name of the lion in 'The Lion King'?", options: ["Mufasa", "Scar", "Simba", "Nala"], answer: 2 },
    { q: "Which movie features the quote 'I am your father'?", options: ["Star Trek", "Star Wars: A New Hope", "Star Wars: Empire Strikes Back", "Blade Runner"], answer: 2 },
    { q: "What year was the first Harry Potter film released?", options: ["1999", "2000", "2001", "2002"], answer: 2 },
    { q: "Who wrote the Game of Thrones book series?", options: ["J.R.R. Tolkien", "George R.R. Martin", "Patrick Rothfuss", "Brandon Sanderson"], answer: 1 },
    { q: "In Breaking Bad, what is Walter White's teacher subject?", options: ["Physics", "Biology", "Chemistry", "Math"], answer: 2 },
    { q: "Which actor played the Joker in The Dark Knight?", options: ["Jack Nicholson", "Jared Leto", "Heath Ledger", "Joaquin Phoenix"], answer: 2 },
    { q: "What is the name of the fictional kingdom in Frozen?", options: ["Agrabah", "Arendelle", "Dunbroch", "Corona"], answer: 1 },
    { q: "Who played Jack in Titanic?", options: ["Brad Pitt", "Johnny Depp", "Leonardo DiCaprio", "Matt Damon"], answer: 2 },
    { q: "How many seasons does Breaking Bad have?", options: ["4", "5", "6", "7"], answer: 1 },
    { q: "What movie does 'You had me at hello' come from?", options: ["Notting Hill", "When Harry Met Sally", "Jerry Maguire", "Pretty Woman"], answer: 2 },
    { q: "Who is the director of Inception?", options: ["Ridley Scott", "Christopher Nolan", "Quentin Tarantino", "Denis Villeneuve"], answer: 1 },
    { q: "What streaming platform has Stranger Things?", options: ["HBO", "Disney+", "Netflix", "Amazon Prime"], answer: 2 },
    { q: "Which movie won the first Oscar for Best Picture?", options: ["All Quiet on the Western Front", "Wings", "Ben-Hur", "The Jazz Singer"], answer: 1 },
    { q: "Who voices Woody in Toy Story?", options: ["Tim Allen", "Tom Hanks", "Billy Crystal", "John Goodman"], answer: 1 },
    { q: "What is the name of the Skywalker in Star Wars?", options: ["Anakin only", "Luke only", "Both Anakin and Luke", "Rey"], answer: 2 },
    { q: "Which TV show is set in Westeros?", options: ["The Witcher", "Vikings", "Game of Thrones", "The Last Kingdom"], answer: 2 },
    { q: "Who played Black Widow in the MCU?", options: ["Brie Larson", "Scarlett Johansson", "Zoe Saldana", "Elizabeth Olsen"], answer: 1 },
    { q: "What country produces the most movies annually?", options: ["USA", "China", "Nigeria", "India"], answer: 3 },
    { q: "Which movie has the line 'Just keep swimming'?", options: ["Shark Tale", "Finding Nemo", "Moana", "The Little Mermaid"], answer: 1 },
    { q: "What color is the Hulk?", options: ["Blue", "Red", "Green", "Purple"], answer: 2 },
    { q: "The TV series 'The Crown' is about which royal family?", options: ["Spanish", "Dutch", "Danish", "British"], answer: 3 },
  ],

  "🎵 Music": [
    { q: "Who is known as the 'King of Pop'?", options: ["Elvis Presley", "Prince", "Michael Jackson", "James Brown"], answer: 2 },
    { q: "How many strings does a standard guitar have?", options: ["4", "5", "6", "7"], answer: 2 },
    { q: "Which band wrote 'Bohemian Rhapsody'?", options: ["Led Zeppelin", "The Beatles", "Queen", "The Rolling Stones"], answer: 2 },
    { q: "What is the fastest tempo marking in music?", options: ["Allegro", "Presto", "Vivace", "Prestissimo"], answer: 3 },
    { q: "Which artist has the most Grammy wins?", options: ["Stevie Wonder", "Beyoncé", "Taylor Swift", "Jay-Z"], answer: 2 },
    { q: "What was The Beatles' original name?", options: ["The Quarrymen", "The Silver Beatles", "The Blackjacks", "The Fab Four"], answer: 0 },
    { q: "Which country does reggae music originate from?", options: ["Cuba", "Trinidad", "Jamaica", "Haiti"], answer: 2 },
    { q: "How many keys does a standard piano have?", options: ["76", "80", "88", "92"], answer: 2 },
    { q: "Who sang 'Rolling in the Deep'?", options: ["Rihanna", "Beyoncé", "Adele", "Amy Winehouse"], answer: 2 },
    { q: "What instrument does a percussionist play?", options: ["Strings", "Wind", "Rhythm / Drums", "Keys"], answer: 2 },
    { q: "What year did Spotify launch?", options: ["2006", "2007", "2008", "2009"], answer: 2 },
    { q: "Who sang 'Shape of You'?", options: ["Justin Bieber", "Sam Smith", "Ed Sheeran", "Charlie Puth"], answer: 2 },
    { q: "What does 'BPM' stand for in music?", options: ["Beats Per Measure", "Beats Per Minute", "Bass Per Mix", "Beat Pattern Method"], answer: 1 },
    { q: "Which rapper has a daughter named Blue Ivy?", options: ["Drake", "Kanye West", "Jay-Z", "Lil Wayne"], answer: 2 },
    { q: "What instrument is Yo-Yo Ma known for?", options: ["Piano", "Violin", "Cello", "Viola"], answer: 2 },
    { q: "Who composed 'Symphony No. 5' with the famous four-note motif?", options: ["Mozart", "Bach", "Beethoven", "Handel"], answer: 2 },
    { q: "What is the name of Taylor Swift's debut album?", options: ["Fearless", "Taylor Swift", "Speak Now", "Red"], answer: 1 },
    { q: "Which country does BTS come from?", options: ["Japan", "China", "South Korea", "Thailand"], answer: 2 },
    { q: "What music genre did Elvis Presley popularize?", options: ["Jazz", "Blues", "Rock and Roll", "Country"], answer: 2 },
    { q: "Who sings 'Blinding Lights'?", options: ["Drake", "Post Malone", "The Weeknd", "Bruno Mars"], answer: 2 },
    { q: "What does 'DJ' stand for?", options: ["Digital Jukebox", "Disc Jockey", "Digital Jockey", "Dynamic Jukebox"], answer: 1 },
    { q: "How many members are in a string quartet?", options: ["2", "3", "4", "5"], answer: 2 },
    { q: "Who is known as the 'Queen of Soul'?", options: ["Diana Ross", "Tina Turner", "Aretha Franklin", "Whitney Houston"], answer: 2 },
    { q: "What is the name of Eminem's alter ego?", options: ["Slim Jim", "Slim Shady", "B-Rabbit", "Marshall"], answer: 1 },
    { q: "Which instrument has black and white keys?", options: ["Xylophone", "Accordion", "Piano", "Both A and C"], answer: 2 },
  ],

  "💻 Technology": [
    { q: "What does 'CPU' stand for?", options: ["Core Processing Unit", "Central Processing Unit", "Computer Processing Unit", "Central Power Unit"], answer: 1 },
    { q: "Who founded Apple Inc.?", options: ["Bill Gates", "Elon Musk", "Steve Jobs", "Jeff Bezos"], answer: 2 },
    { q: "What does 'HTML' stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Transfer Machine Language", "Hyper Text Machine Logic"], answer: 0 },
    { q: "What year was the first iPhone released?", options: ["2005", "2006", "2007", "2008"], answer: 2 },
    { q: "What is the most used programming language?", options: ["Java", "C++", "Python", "JavaScript"], answer: 3 },
    { q: "What does 'Wi-Fi' stand for?", options: ["Wireless Fidelity", "Wireless Fiber", "Wide Fidelity", "Nothing — it's a brand name"], answer: 3 },
    { q: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Larry Page", "Mark Zuckerberg"], answer: 1 },
    { q: "What does 'URL' stand for?", options: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Redirect Location", "Unique Resource Locator"], answer: 0 },
    { q: "How many bits are in a byte?", options: ["4", "6", "8", "16"], answer: 2 },
    { q: "What company made the PlayStation?", options: ["Nintendo", "Microsoft", "Sega", "Sony"], answer: 3 },
    { q: "What does 'AI' stand for?", options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Applied Information"], answer: 1 },
    { q: "What is the most visited website in the world?", options: ["Facebook", "YouTube", "Google", "Wikipedia"], answer: 2 },
    { q: "What does 'USB' stand for?", options: ["Universal Serial Bus", "Unified Storage Bridge", "Ultra Speed Bridge", "Universal Signal Beam"], answer: 0 },
    { q: "What year was Google founded?", options: ["1996", "1997", "1998", "1999"], answer: 2 },
    { q: "Who created the World Wide Web?", options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Vint Cerf"], answer: 2 },
    { q: "What does 'RAM' stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Application Memory", "Read Application Module"], answer: 1 },
    { q: "Which company makes the Android OS?", options: ["Apple", "Microsoft", "Google", "Samsung"], answer: 2 },
    { q: "What is the shortcut to copy on a PC?", options: ["Ctrl+X", "Ctrl+V", "Ctrl+C", "Ctrl+P"], answer: 2 },
    { q: "What does 'PDF' stand for?", options: ["Printed Document Format", "Portable Document Format", "Public Data Format", "Processed Document File"], answer: 1 },
    { q: "Who co-founded Tesla?", options: ["Elon Musk alone", "Bill Gates and Elon Musk", "Martin Eberhard and Marc Tarpenning", "Elon Musk and Jeff Bezos"], answer: 2 },
    { q: "What is the name of the AI assistant made by Amazon?", options: ["Siri", "Cortana", "Alexa", "Bixby"], answer: 2 },
    { q: "What does 'VR' stand for?", options: ["Virtual Reality", "Visual Rendering", "Video Reality", "Visual Response"], answer: 0 },
    { q: "What social media platform uses hashtags prominently?", options: ["Facebook", "LinkedIn", "Twitter/X", "Both B and C"], answer: 2 },
    { q: "What is the name of the programming language named after a snake?", options: ["Cobra", "Anaconda", "Python", "Boa"], answer: 2 },
    { q: "What year was Facebook launched publicly?", options: ["2003", "2004", "2005", "2006"], answer: 3 },
  ],

  "🍕 Food & Cooking": [
    { q: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Cucumber", "Mango"], answer: 1 },
    { q: "Which country is sushi originally from?", options: ["China", "Korea", "Japan", "Thailand"], answer: 2 },
    { q: "What type of pastry is used in a croissant?", options: ["Shortcrust", "Filo", "Choux", "Puff/Laminated"], answer: 3 },
    { q: "What is the main spice in Indian curry?", options: ["Cumin", "Turmeric", "Coriander", "Saffron"], answer: 1 },
    { q: "Which nut is used to make marzipan?", options: ["Walnut", "Hazelnut", "Almond", "Pecan"], answer: 2 },
    { q: "What country did pizza originate from?", options: ["Greece", "Spain", "France", "Italy"], answer: 3 },
    { q: "What is the most consumed meat in the world?", options: ["Beef", "Chicken", "Pork", "Lamb"], answer: 2 },
    { q: "What is 'umami'?", options: ["A Japanese spice", "The fifth basic taste", "A cooking style", "A type of soy sauce"], answer: 1 },
    { q: "Which fruit is known as the 'king of fruits'?", options: ["Mango", "Jackfruit", "Durian", "Papaya"], answer: 2 },
    { q: "What is the base of a Hollandaise sauce?", options: ["Cream", "Egg yolks and butter", "Flour and milk", "Olive oil"], answer: 1 },
    { q: "What cheese is used in a traditional Greek salad?", options: ["Brie", "Mozzarella", "Feta", "Parmesan"], answer: 2 },
    { q: "What is the primary ingredient in hummus?", options: ["Lentils", "Black beans", "Chickpeas", "White beans"], answer: 2 },
    { q: "How many teaspoons are in a tablespoon?", options: ["2", "3", "4", "5"], answer: 1 },
    { q: "What country is known for inventing Champagne?", options: ["Spain", "Italy", "France", "Germany"], answer: 2 },
    { q: "What is the spiciest pepper in the world (as of recent records)?", options: ["Ghost Pepper", "Carolina Reaper", "Habanero", "Scorpion Pepper"], answer: 1 },
    { q: "What is tiramisu made with?", options: ["Chocolate cake and cream", "Ladyfingers, coffee, and mascarpone", "Sponge cake and custard", "Cookies and ice cream"], answer: 1 },
    { q: "What type of bread is used for a traditional BLT?", options: ["Rye", "Sourdough", "White/Toast", "Brioche"], answer: 2 },
    { q: "What is the main ingredient in tofu?", options: ["Chickpeas", "Rice", "Soybeans", "Almonds"], answer: 2 },
    { q: "What is the French word for 'bread'?", options: ["Fromage", "Pain", "Croûton", "Beurre"], answer: 1 },
    { q: "Which vitamin is most abundant in oranges?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], answer: 2 },
    { q: "What gas is used in carbonated drinks?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"], answer: 2 },
    { q: "What is the national dish of Spain?", options: ["Tapas", "Churros", "Paella", "Gazpacho"], answer: 2 },
    { q: "What is Wagyu famous for?", options: ["It's organic", "It's the most expensive cheese", "It's a premium beef", "It's a Japanese pork"], answer: 2 },
    { q: "Pad Thai originates from which country?", options: ["Vietnam", "China", "Malaysia", "Thailand"], answer: 3 },
    { q: "What type of food is a 'brioche'?", options: ["Cake", "Pastry/Bread", "Cookie", "Cracker"], answer: 1 },
  ],

  "🧠 General Knowledge": [
    { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
    { q: "What is the currency of the United Kingdom?", options: ["Euro", "Dollar", "Pound Sterling", "Franc"], answer: 2 },
    { q: "What does a barometer measure?", options: ["Temperature", "Humidity", "Atmospheric Pressure", "Wind Speed"], answer: 2 },
    { q: "Which language has the most native speakers?", options: ["English", "Spanish", "Mandarin Chinese", "Hindi"], answer: 2 },
    { q: "What is the fear of spiders called?", options: ["Ophidiophobia", "Arachnophobia", "Entomophobia", "Agoraphobia"], answer: 1 },
    { q: "What is the Roman numeral for 50?", options: ["X", "L", "C", "D"], answer: 1 },
    { q: "What is the longest bone in the human body?", options: ["Tibia", "Humerus", "Femur", "Spine"], answer: 2 },
    { q: "How many colors are in a rainbow?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: 2 },
    { q: "What is the national animal of Australia?", options: ["Koala", "Kangaroo", "Emu", "Wombat"], answer: 1 },
    { q: "How many days are in a leap year?", options: ["364", "365", "366", "367"], answer: 2 },
    { q: "What is the chemical symbol for iron?", options: ["Ir", "In", "Fe", "Fr"], answer: 2 },
    { q: "What is the largest mammal in the world?", options: ["African Elephant", "Blue Whale", "Colossal Squid", "Giant Squid"], answer: 1 },
    { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
    { q: "What is the opposite of 'nocturnal'?", options: ["Diurnal", "Crepuscular", "Narcoleptic", "Vespertine"], answer: 0 },
    { q: "How many weeks are in a year?", options: ["50", "51", "52", "53"], answer: 2 },
    { q: "What is the study of earthquakes called?", options: ["Volcanology", "Seismology", "Geology", "Tectonics"], answer: 1 },
    { q: "How many letters are in the English alphabet?", options: ["24", "25", "26", "27"], answer: 2 },
    { q: "What is the largest ocean animal?", options: ["Great White Shark", "Sperm Whale", "Blue Whale", "Orca"], answer: 2 },
    { q: "What is the tallest type of grass?", options: ["Sugarcane", "Wheat", "Bamboo", "Pampas Grass"], answer: 2 },
    { q: "What does 'FAQ' stand for?", options: ["Frequent Answers and Questions", "Frequently Asked Questions", "First Answered Questions", "Full Answer Queue"], answer: 1 },
    { q: "What is the world's most widely spoken language?", options: ["Spanish", "English", "Mandarin", "Arabic"], answer: 1 },
    { q: "What shape has four equal sides and four right angles?", options: ["Rectangle", "Rhombus", "Square", "Trapezoid"], answer: 2 },
    { q: "In what direction does the sun rise?", options: ["West", "North", "East", "South"], answer: 2 },
    { q: "What is the hardest natural substance?", options: ["Titanium", "Steel", "Diamond", "Sapphire"], answer: 2 },
  ],

  "🦁 Animals & Nature": [
    { q: "What is a group of wolves called?", options: ["Pack", "Herd", "Pride", "Colony"], answer: 0 },
    { q: "How long is an elephant's gestation period?", options: ["12 months", "18 months", "22 months", "24 months"], answer: 2 },
    { q: "What is the fastest land animal?", options: ["Lion", "Cheetah", "Pronghorn", "Greyhound"], answer: 1 },
    { q: "How many hearts does an octopus have?", options: ["1", "2", "3", "4"], answer: 2 },
    { q: "What is the largest species of shark?", options: ["Great White", "Bull Shark", "Whale Shark", "Tiger Shark"], answer: 2 },
    { q: "What is the national bird of the USA?", options: ["Golden Eagle", "Bald Eagle", "American Robin", "Wild Turkey"], answer: 1 },
    { q: "How many legs does an insect have?", options: ["4", "6", "8", "10"], answer: 1 },
    { q: "What is a baby kangaroo called?", options: ["Cub", "Pup", "Joey", "Kit"], answer: 2 },
    { q: "Which animal has the longest lifespan?", options: ["Tortoise", "Bowhead Whale", "Greenland Shark", "Ocean Quahog Clam"], answer: 3 },
    { q: "What is the only mammal that can fly?", options: ["Flying Squirrel", "Flying Lemur", "Bat", "Sugar Glider"], answer: 2 },
    { q: "What color is a polar bear's skin?", options: ["White", "Pink", "Black", "Yellow"], answer: 2 },
    { q: "How many species of penguins exist?", options: ["10", "14", "18", "22"], answer: 2 },
    { q: "What is the largest land animal?", options: ["Hippopotamus", "White Rhino", "African Bush Elephant", "Giraffe"], answer: 2 },
    { q: "How many eyes does a spider typically have?", options: ["4", "6", "8", "10"], answer: 2 },
    { q: "What animal has the longest neck?", options: ["Camel", "Ostrich", "Giraffe", "Emu"], answer: 2 },
    { q: "What is the smallest bird in the world?", options: ["Bee Hummingbird", "Weebill", "Goldcrest", "Pardalote"], answer: 0 },
    { q: "How long can a snail sleep?", options: ["1 week", "1 month", "3 years", "5 years"], answer: 2 },
    { q: "What is the collective noun for a group of flamingos?", options: ["Flock", "Flamboyance", "Colony", "Gaggle"], answer: 1 },
    { q: "Which animal has fingerprints similar to humans?", options: ["Gorilla", "Chimpanzee", "Koala", "Both B and C"], answer: 3 },
    { q: "What is the most venomous spider?", options: ["Black Widow", "Brown Recluse", "Funnel-web", "Brazilian Wandering Spider"], answer: 3 },
    { q: "What is the largest bird by wingspan?", options: ["Condor", "Albatross", "Wandering Albatross", "Eagle"], answer: 2 },
    { q: "How many chambers does a cow's stomach have?", options: ["2", "3", "4", "5"], answer: 2 },
    { q: "What animal can change its color to match surroundings?", options: ["Octopus", "Chameleon", "Cuttlefish", "All of the above"], answer: 3 },
    { q: "What is the gestation period of a human?", options: ["36 weeks", "38 weeks", "40 weeks", "42 weeks"], answer: 2 },
    { q: "What is a group of crows called?", options: ["Flock", "Pack", "Murder", "Gang"], answer: 2 },
  ],
};

// ─── GAME STATE ───────────────────────────────────────────────────────────────

const rooms = {};

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

// ─── SOCKET LOGIC ─────────────────────────────────────────────────────────────

io.on('connection', (socket) => {

  // HOST creates room
  socket.on('host:create', ({ password }) => {
    const code = generateRoomCode();
    rooms[code] = {
      code,
      password,
      host: socket.id,
      players: {},
      state: 'lobby',         // lobby | question | results | leaderboard
      currentQuestion: null,
      questionIndex: 0,
      currentTopic: null,
      selectedQuestions: [],
      timerInterval: null,
      timeLeft: 15,
      answers: {},
    };
    socket.join(code);
    socket.emit('host:created', { code, topics: Object.keys(QUESTIONS) });
    console.log(`Room ${code} created by host`);
  });

  // PLAYER joins room
  socket.on('player:join', ({ code, password, name }) => {
    const room = rooms[code];
    if (!room) return socket.emit('error', 'Room not found');
    if (room.password !== password) return socket.emit('error', 'Wrong password');
    if (room.state !== 'lobby') return socket.emit('error', 'Game already started');

    room.players[socket.id] = { name, score: 0, id: socket.id };
    socket.join(code);
    socket.data.roomCode = code;
    socket.data.playerName = name;

    socket.emit('player:joined', { name, code });
    io.to(code).emit('room:players', Object.values(room.players));
    io.to(room.host).emit('host:players', Object.values(room.players));
    console.log(`${name} joined room ${code}`);
  });

  // HOST gets question list for a topic
  socket.on('host:selectTopic', ({ code, topic }) => {
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;

    const questions = QUESTIONS[topic];
    if (!questions) return;

    room.currentTopic = topic;
    room.selectedQuestions = [...questions].sort(() => Math.random() - 0.5);
    room.questionIndex = 0;

    socket.emit('host:topicLoaded', {
      topic,
      questions: room.selectedQuestions.map((q, i) => ({ ...q, index: i }))
    });
  });

  // HOST starts the game / picks a question
  socket.on('host:startQuestion', ({ code, questionIndex }) => {
    const room = rooms[code];
    if (!room || room.host !== socket.id) return;

    const q = room.selectedQuestions[questionIndex];
    if (!q) return;

    // Clear existing timer
    if (room.timerInterval) clearInterval(room.timerInterval);

    room.state = 'question';
    room.currentQuestion = { ...q, index: questionIndex };
    room.answers = {};
    room.timeLeft = 15;

    // Send question to players (NO answer)
    io.to(code).emit('game:question', {
      question: q.q,
      options: q.options,
      index: questionIndex,
      topic: room.currentTopic,
      timeLeft: 15,
    });

    // Send question + answer index to host only
    socket.emit('host:questionFull', {
      question: q.q,
      options: q.options,
      answer: q.answer,
      index: questionIndex,
      topic: room.currentTopic,
    });

    // Countdown
    room.timerInterval = setInterval(() => {
      room.timeLeft--;
      io.to(code).emit('game:timer', { timeLeft: room.timeLeft });

      if (room.timeLeft <= 0) {
        clearInterval(room.timerInterval);
        endQuestion(code);
      }
    }, 1000);
  });

  // PLAYER answers
  socket.on('player:answer', ({ code, answerIndex }) => {
    const room = rooms[code];
    if (!room || room.state !== 'question') return;
    if (room.answers[socket.id]) return; // Already answered

    const timeUsed = 15 - room.timeLeft;
    const correct = answerIndex === room.currentQuestion.answer;
    const points = correct ? Math.max(100, Math.round(1000 - (timeUsed / 15) * 900)) : 0;

    room.answers[socket.id] = {
      playerId: socket.id,
      name: room.players[socket.id]?.name || 'Unknown',
      answerIndex,
      correct,
      points,
      timeUsed,
    };

    if (correct) {
      room.players[socket.id].score += points;
    }

    // Confirm to player
    socket.emit('player:answerResult', { correct, points });

    // Notify host of live answers
    io.to(room.host).emit('host:answerUpdate', {
      total: Object.keys(room.players).length,
      answered: Object.keys(room.answers).length,
      answers: Object.values(room.answers),
    });

    // Auto-end if everyone answered
    if (Object.keys(room.answers).length >= Object.keys(room.players).length) {
      clearInterval(room.timerInterval);
      endQuestion(code);
    }
  });

  function endQuestion(code) {
    const room = rooms[code];
    if (!room) return;
    room.state = 'results';

    const sorted = Object.values(room.answers).sort((a, b) => b.points - a.points);
    const leaderboard = Object.values(room.players).sort((a, b) => b.score - a.score);

    io.to(code).emit('game:questionEnd', {
      answers: sorted,
      leaderboard,
      correctAnswer: room.currentQuestion.answer,
      correctOptionText: room.currentQuestion.options[room.currentQuestion.answer],
    });
  }

  // HOST shows leaderboard
  socket.on('host:showLeaderboard', ({ code }) => {
    const room = rooms[code];
    if (!room) return;
    const leaderboard = Object.values(room.players).sort((a, b) => b.score - a.score);
    io.to(code).emit('game:leaderboard', { leaderboard });
  });

  // HOST resets game
  socket.on('host:reset', ({ code }) => {
    const room = rooms[code];
    if (!room) return;
    room.state = 'lobby';
    room.answers = {};
    room.currentQuestion = null;
    if (room.timerInterval) clearInterval(room.timerInterval);
    Object.values(room.players).forEach(p => p.score = 0);
    io.to(code).emit('game:reset');
    socket.emit('host:resetDone', { topics: Object.keys(QUESTIONS) });
  });

  socket.on('disconnect', () => {
    for (const [code, room] of Object.entries(rooms)) {
      if (room.players[socket.id]) {
        delete room.players[socket.id];
        io.to(code).emit('room:players', Object.values(room.players));
        io.to(room.host).emit('host:players', Object.values(room.players));
      }
      if (room.host === socket.id) {
        io.to(code).emit('error', 'Host disconnected');
        delete rooms[code];
      }
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n🎮 QuizMaster running at http://localhost:${PORT}\n`);
});
