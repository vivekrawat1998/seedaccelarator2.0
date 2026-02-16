const san1Participants = [
    { id: 1, name: "Dr Avinash Umate", organization: "Assistant Breeder (Paddy), VNR Seeds Pvt. Ltd., Hyderabad, Telangana" },
    { id: 2, name: "Dr Girija Rani", organization: "Principal Scientist & Head-Plant Breeding, Agricultural Research Station, ANGRAU, Machilipatnam, Andhra Pradesh" },
    { id: 3, name: "Dr KC Sahoo", organization: "Director (Commercial), National Seeds Corporation, Delhi" },
    { id: 4, name: "Dr. Moushree Sakar", organization: "Head R&D, GMS Agritech Pvt. Ltd., Kolkata, West Bengal" },
    { id: 5, name: "Dr. N.P. Mandal", organization: "Principal Scientist-Plant Breeding, ICAR NRRI, CRURRS, Hazaribagh, Jharkhand" },
    { id: 6, name: "Dr. Saurabh Dixit", organization: "Senior Scientist (Plant Breeder), Crop Research Station, ANDUAT, Masodha, Uttar Pradesh" },
    { id: 7, name: "Dr. Sunil Naik", organization: "Crop Breeding Lead, Rallis India, Hyderabad, Telangana" },
    { id: 8, name: "Dr. Surinder Singh Bisht", organization: "Senior Plant Breeder, Bio Seeds Research India, Hyderabad, Telangana" },
    { id: 9, name: "Dr. T. Srinivas", organization: "Principal Scientist (Rice), Agricultural Research Station, ANGRAU, Bapatla, Andhra Pradesh" },
    { id: 10, name: "Dr. Umakant Verma", organization: "Project Manager-Rice Breeding, Bapna Seeds Pvt. Ltd., Raipur, Chhattisgarh" },
    {
        "id": 11,
        "name": "Mr. B.M. Tripathi",
        "organization": "President, Sustainable Human Development Association (SHDA), Gorakhpur, Uttar Pradesh"
    },
    {
        "id": 12,
        "name": "Mr. M. Srinibas Rao",
        "organization": "Proprietor, Bhu Laxmi Seeds Pvt. Ltd., Bargarh, Odisha"
    },
    {
        "id": 13,
        "name": "Mr. Pankaj Singh",
        "organization": "Proprietor, Sone Ganga International Seed Company, Varanasi, Uttar Pradesh"
    },
    {
        "id": 14,
        "name": "Mr. Pradeep Kumar Pandey",
        "organization": "Proprietor, Chaitanya Research Farms Pvt. Ltd., Chandauli, Uttar Pradesh"
    },
    {
        "id": 15,
        "name": "Mr. Ramesh Mishra",
        "organization": "Functional Head, Prabha Samriddhi Farmer Producer Company, Prayagraj, Uttar Pradesh"
    },
    {
        "id": 16,
        "name": "Mr. Swapnil Dwivedi",
        "organization": "Functional Head, Triveni Samriddhi Farmer Producer Company, Prayagraj, Uttar Pradesh"
    },
    {
        "id": 17,
        "name": "Dr. P.K. Singh",
        "organization": "Professor, Dept. of Genetics and Plant Breeding, BHU, Uttar Pradesh"
    },
    {
        "id": 18,
        "name": "Mr. Venkatesh Hubli",
        "organization": "Director R&D, Savanna Seeds Pvt. Ltd., Hyderabad"
    },
    {
        "id": 19,
        "name": "Dr. Pankaj Tripathi",
        "organization": "MD, Uttar Pradesh Beej Nigam, Lucknow"
    },
    {
        "id": 20,
        "name": "Dr. Sujit Shit Breeder",
        "organization": "GMS Agritech Pvt. Ltd., Kolkata"
    },
    {
        "id": 21,
        "name": "Dr. Paneer Selvam Ganesan",
        "organization": "Commercial Head, Mangal Murty Seeds Pvt. Ltd., Bargarh, Odisha"
    },
    {
        "id": 22,
        "name": "Mr. Prem Narayan Singh",
        "organization": "Proprietor, New Andhra Seeds Pvt. Ltd., Varanasi, Uttar Pradesh"
    },
    {
        "id": 23,
        "name": "Mr. Diwakar Nath Tripathi",
        "organization": "Proprietor, New Hygenic Seeds Pvt. Ltd., Varanasi, Uttar Pradesh"
    },
    {
        "id": 24,
        "name": "Mr. Bikas Kumar Singh",
        "organization": "Functional Head, Jaya Seeds Farmer Producer Company, Varanasi, Uttar Pradesh"
    },
    {
        "id": 25,
        "name": "Mr. Ramakant Mishra",
        "organization": "Functional Head, Hariyali Farmer Samriddhi Producer Company Ltd., Bhadohi, Uttar Pradesh"
    },
    {
        "id": 26,
        "name": "Dr. Gopalakrishnan",
        "organization": "Head & Principal Scientist, Dept. of Genetics, IARI, Delhi"
    },
    {
        "id": 27,
        "name": "Dr. Indrani Bhattacharjee",
        "organization": "Asst. Director–Research (Ag.), SHUATS, Prayagraj, Uttar Pradesh"
    },
    {
        "id": 28,
        "name": "Dr. R.S. Gill",
        "organization": "Principal Rice Breeder, PAU, Ludhiana"
    },
    {
        "id": 29,
        "name": "Dr. S.K. Singh",
        "organization": "Professor, Dept. of Genetics and Plant Breeding, BHU, Uttar Pradesh"
    },
    {
        "id": 30,
        "name": "Mr. Sasida Nanda Bordoloi",
        "organization": "COO, Poohar Agro Producer Company Ltd., Morigaon, Assam"
    },
    {
        "id": 31,
        "name": "Dr. Aseem Gangwar",
        "organization": "Regional Manager, National Seeds Corporation, Lucknow"
    },
    {
        "id": 32,
        "name": "Dr. Anup Kumar",
        "organization": "Plant Engineer, Bihar Rajya Beej Nigam, Kundra, Bihar"
    },
    {
        "id": 33,
        "name": "Mr. Sujeet Kumar Mishra",
        "organization": "Functional Head, Rashmijeet Farmer Producer Company, Chandauli, Uttar Pradesh"
    },
    {
        "id": 34,
        "name": "Dr. Rajesh Kumar Chandravanshi",
        "organization": "General Manager, Beej Nigam, Chhattisgarh"
    },
    {
        "id": 35,
        "name": "Mr. Manoj Singh",
        "organization": "Proprietor, RS Seeds Farm Pvt. Ltd., Chandauli, Uttar Pradesh"
    },
    {
        "id": 36,
        "name": "Mr. Anant Kumar Parida",
        "organization": "Proprietor, Gopinatha Seeds Pvt. Ltd., Mayurbhanj, Odisha"
    },
    {
        "id": 37,
        "name": "Dr. Pramod Kumar Rai",
        "organization": "Product Development Head, Rallis India Pvt. Ltd., Lucknow, Uttar Pradesh"
    },
    {
        "id": 38,
        "name": "Mr. Ajay Kumar Singh",
        "organization": "Functional Head, Ishani Agro Farmers Producer Company, Chandauli, Uttar Pradesh"
    },
    {
        "id": 39,
        "name": "Mr. Rajdev Chaturvedi",
        "organization": "Functional Head, Agro Azamgarh Mahila Farmer Producer Company, Azamgarh, Uttar Pradesh"
    },
    {
        "id": 40,
        "name": "Dr. Sachin Panwar",
        "organization": "Head-Marketing, National Seeds Corporation, Lucknow"
    },
    {
        "id": 41,
        "name": "Dr. S.K. Das",
        "organization": "Principal Scientist–Plant Breeding, National Rice Research Institute, Odisha"
    },
    {
        "id": 42,
        "name": "Dr. B.C. Roy",
        "organization": "KVK Cooch Behar, UBKV, West Bengal"
    },
    {
        "id": 43,
        "name": "Dr. B.D. Waghmode",
        "organization": "RARS, DBSKKV, Karjat, Maharashtra"
    },
    {
        "id": 44,
        "name": "Dr. Y. Satish",
        "organization": "RARS, ANGRAU, Maruteru, Andhra Pradesh"
    },
    {
        "id": 45,
        "name": "Mr. Nagabundi Uday",
        "organization": "Centre for Sustainable Agriculture (CSA), Jangaon, Telangana"
    },
    {
        "id": 46,
        "name": "Mr. Gunjam Wailung Shyam",
        "organization": "Assam Seeds Corporation Ltd., Guwahati, Assam"
    },
    {
        "id": 47,
        "name": "Dr. Kuldeep Tyagi",
        "organization": "Signet Seeds, Hyderabad"
    },
    {
        "id": 48,
        "name": "Mr. Anup Kumar Pathak",
        "organization": "Shraddha Saburi Sai Farmer Producer Company Ltd., Chandauli, Uttar Pradesh"
    },
    {
        "id": 49,
        "name": "Dr. Pradeep Kumar Mishra",
        "organization": "National Seeds Corporation, Varanasi"
    },
    {
        "id": 50,
        "name": "Mr. Om Prakash Dubey",
        "organization": "Rudrakshi Farmer Producer Company Limited, Varanasi, Uttar Pradesh"
    },
    {
        "id": 51,
        "name": "Mr. Jaikrushna Pradhan",
        "organization": "JKBK Seeds, Odisha"
    },
    {
        "id": 52,
        "name": "Mr. Vikas Puri",
        "organization": "Guri Siddhant Puri Farmer Producer Company, Bhadohi, Uttar Pradesh"
    },
    {
        "id": 53,
        "name": "Mr. Abhay Shankar Tiwari",
        "organization": "Nay Pragyan Farmer Producer Company, Varanasi, Uttar Pradesh"
    },
    {
        "id": 54,
        "name": "Mr. Nitin Srivastava",
        "organization": "Kashi Vishwanath Farmer Producer Company, Varanasi, Uttar Pradesh"
    },
    {
        "id": 55,
        "name": "Dr. Janardan Das",
        "organization": "AAU, Assam"
    },
    {
        "id": 56,
        "name": "Dr. Ramana Rao",
        "organization": "RARS, ANGRAU, Maruteru, Andhra Pradesh"
    },
    {
        "id": 57,
        "name": "Dr. Santosh Kumar",
        "organization": "RCER, Patna"
    }
];



const San2Participants = [
    { id: 1, name: "Dr. Pradip Dey", organization: "Director, ICAR ATARI, Kolkata (Zone-V)" },
    { id: 2, name: "Dr. H.C Bhattacharya", organization: "Scientific Consultant, ICAR ATARI Guwahati, Zone VI" },
    { id: 3, name: "Dr. Shantanu Kuar Dubey", organization: "Director, ICAR ATARI, Kanpur (Zone-IV)" },
    { id: 4, name: "Mr. Anuj Kumar Singh", organization: "Consultant, Uttar Pradesh Beej Vikas Nigam, Lucknow" },
    { id: 5, name: "Mr. Gunjanan Wallung Shyam", organization: "Asst. Branch Manager, Assam Seeds Corporation, Guwahati" },
    { id: 6, name: "Mr. Aditya Kumar Panda", organization: "DGM, Odisha State Seed Corporation" },
    { id: 7, name: "Dr. Prafull Lahane", organization: "GM, Quality Control, Mahabeej, Akola" },
    { id: 8, name: "Mr. Vivek Thakare", organization: "GM, Production, Mahabeej, Akola" },
    { id: 9, name: "Mr. Shardool Vikram Chaudhari", organization: "Director Production, Jaya seeds, Varanasi" },
    { id: 10, name: "Mr. Manoj Kumar", organization: "Functional Head, R S Seeds, Varanasi" },
    {
        "id": 11,
        "name": "Mr. Ranjan Kr Barthakur",
        "organization": "Poohar Agro Producer Company Ltd, Guwahati"
    },
    {
        "id": 12,
        "name": "Mr. Satyabrata Biswal",
        "organization": "Agro-ecology Society, Odisha"
    },
    {
        "id": 13,
        "name": "Mr. Abhay Sanker Tiwari",
        "organization": "Navpragyan FPC, Varanasi"
    },
    {
        "id": 14,
        "name": "Dr. Raja Shekhar G",
        "organization": "Centre for Sustainable Agriculture, Hyderabad"
    },
    {
        "id": 15,
        "name": "Dr. Prabhuguouda Patil",
        "organization": "Advanta Seeds, Hyderabad"
    },
    {
        "id": 16,
        "name": "Dr. Satish Pareek",
        "organization": "Advanta Seeds, Hyderabad"
    },
    {
        "id": 17,
        "name": "Mr. Vishal Kumar",
        "organization": "Atamanda Seeds, Hyderabad"
    },
    {
        "id": 18,
        "name": "Mr. Md. Sajid",
        "organization": "Atamanda Seeds, Hyderabad"
    },
    {
        "id": 19,
        "name": "Dr. Amaresh Chandel",
        "organization": "Bayer Crop Science, Hyderabad"
    },
    {
        "id": 20,
        "name": "Dr. Rajesh Mishra",
        "organization": "Harlal Seeds, Hyderabad"
    },
    {
        "id": 21,
        "name": "Dr. Vikram Yadav",
        "organization": "Indo-American Hybrid Seeds, Hyderabad"
    },
    {
        "id": 22,
        "name": "Dr. Sharattbabu Sonnad",
        "organization": "Mahindra Agri Solutions, Hyderabad"
    },
    {
        "id": 23,
        "name": "Dr. P. Ravi Yugandhar",
        "organization": "Mahindra Agri Solutions, Hyderabad"
    },
    {
        "id": 24,
        "name": "Dr. Devender Kumar Kadian",
        "organization": "Nuziveedu Seeds, Hyderabad"
    },
    {
        "id": 25,
        "name": "Dr. Kuldeep Tyagi",
        "organization": "Signet Seeds, Hyderabad"
    },
    {
        "id": 26,
        "name": "Dr. Sudesh Sharma",
        "organization": "Signet Seeds, Hyderabad"
    },
    {
        "id": 27,
        "name": "Dr. Gagandeep Singh",
        "organization": "Star AgriSeeds, Sangaria"
    },
    {
        "id": 28,
        "name": "Dr. Amit Shukla",
        "organization": "Trimurti Plant Science, Hyderabad"
    },
    {
        "id": 29,
        "name": "Mr. Himanshu Tyagi",
        "organization": "Vertical AgroSciences, Noida"
    },
    {
        "id": 30,
        "name": "Dr. Sayed Akhter",
        "organization": "Eagle Seeds, Hyderabad"
    },
    {
        "id": 31,
        "name": "Dr. Avinash Unte",
        "organization": "VNR Seeds, Hyderabad"
    },
    {
        "id": 32,
        "name": "Dr. Subhash C. Yadav",
        "organization": "Eldorado Seeds, Hyderabad"
    },
    {
        "id": 33,
        "name": "Dr. Srijib Panda",
        "organization": "Siri Seeds, Hyderabad"
    },
    {
        "id": 34,
        "name": "Dr. Sunil Naik",
        "organization": "Rallis India, Hyderabad"
    }


];

export { san1Participants, San2Participants }