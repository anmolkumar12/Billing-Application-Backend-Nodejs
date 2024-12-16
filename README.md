--users table Creation----

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY, 
email VARCHAR(255) NOT NULL UNIQUE,
username VARCHAR(255) NOT NULL,
role VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

--companyinfo table creation----

CREATE TABLE company_info (
id INT AUTO_INCREMENT PRIMARY KEY,
companyName VARCHAR(255) NOT NULL,
Website VARCHAR(255),
CINNO VARCHAR(255),
IECode VARCHAR(255),
PAN VARCHAR(255),
Email VARCHAR(255),
logopath VARCHAR(255),
description TEXT,
updated_by VARCHAR(255),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
isactive BOOLEAN DEFAULT TRUE,
gst_number VARCHAR(255),
address VARCHAR(255)
);

--industries table creation----

CREATE TABLE industries (
id INT AUTO_INCREMENT PRIMARY KEY,
industryName VARCHAR(255) NOT NULL,
description TEXT,
industryHead VARCHAR(255),
isActive BOOLEAN DEFAULT TRUE,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
updated_by VARCHAR(255)
);

--project_master table creation----

CREATE TABLE project_master ( id INT AUTO_INCREMENT PRIMARY KEY, projectName VARCHAR(255) NOT NULL, projectDescription TEXT, isActive BOOLEAN DEFAULT TRUE, updated_by INT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );

--product_master table creation----

CREATE TABLE product_master ( id INT AUTO_INCREMENT PRIMARY KEY, productName VARCHAR(255) NOT NULL, productDescription TEXT, isActive BOOLEAN DEFAULT TRUE, updated_by INT, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );

--currency_master table creation----

CREATE TABLE currency_master ( id INT AUTO_INCREMENT PRIMARY KEY, currencyName VARCHAR(255) NOT NULL, currencyDescription TEXT, exchangeRate DECIMAL(10, 2),isActive BOOLEAN DEFAULT 1, updated_by VARCHAR(255), updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );

--tax_master table creation----

CREATE TABLE tax_master (
id INT AUTO_INCREMENT PRIMARY KEY, 
taxType VARCHAR(255) NOT NULL, 
taxPercentage DECIMAL(5, 2) NOT NULL, 
effectiveDate VARCHAR(255) NOT NULL, 
isActive BOOLEAN DEFAULT 1, 
updated_by VARCHAR(255) NOT NULL, 
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--countries table creation----

CREATE TABLE countries (
id INT AUTO_INCREMENT PRIMARY KEY, 
code VARCHAR(3) NOT NULL,
currency VARCHAR(255), 
name VARCHAR(255) NOT NULL, 
language VARCHAR(255),
phone_code VARCHAR(10), 
UNIQUE (code)
);

--countries table insertion----

INSERT IGNORE INTO countries (code, currency, name, language, phone_code)
VALUES
('AFG', 'AFN', 'Afghanistan', 'Pashto, Dari', '+93'),
('ALB', 'ALL', 'Albania', 'Albanian', '+355'),
('DZA', 'DZD', 'Algeria', 'Arabic, Berber', '+213'),
('AND', 'EUR', 'Andorra', 'Catalan', '+376'),
('AGO', 'AOA', 'Angola', 'Portuguese', '+244'),
('ATG', 'XCD', 'Antigua and Barbuda', 'English', '+1-268'),
('ARG', 'ARS', 'Argentina', 'Spanish', '+54'),
('ARM', 'AMD', 'Armenia', 'Armenian', '+374'),
('AUS', 'AUD', 'Australia', 'English', '+61'),
('AUT', 'EUR', 'Austria', 'German', '+43'),
('AZE', 'AZN', 'Azerbaijan', 'Azerbaijani', '+994'),
('BHS', 'BSD', 'Bahamas', 'English', '+1-242'),
('BHR', 'BHD', 'Bahrain', 'Arabic', '+973'),
('BGD', 'BDT', 'Bangladesh', 'Bengali', '+880'),
('BRB', 'BBD', 'Barbados', 'English', '+1-246'),
('BLR', 'BYN', 'Belarus', 'Belarusian, Russian', '+375'),
('BEL', 'EUR', 'Belgium', 'Dutch, French, German', '+32'),
('BLZ', 'BZD', 'Belize', 'English', '+501'),
('BEN', 'CDF', 'Benin', 'French', '+229'),
('BOL', 'BOB', 'Bolivia', 'Spanish, Quechua, Aymara', '+591'),
('BIH', 'BAM', 'Bosnia and Herzegovina', 'Bosnian, Croatian, Serbian', '+387'),
('BWA', 'BWP', 'Botswana', 'English, Tswana', '+267'),
('BRA', 'BRL', 'Brazil', 'Portuguese', '+55'),
('BRN', 'BND', 'Brunei', 'Malay', '+673'),
('BGR', 'BGN', 'Bulgaria', 'Bulgarian', '+359'),
('BFA', 'BF', 'Burkina Faso', 'French', '+226'),
('BDI', 'BDI', 'Burundi', 'Kirundi, French, English', '+257'),
('CPV', 'CVE', 'Cabo Verde', 'Portuguese', '+238'),
('KHM', 'KHR', 'Cambodia', 'Khmer', '+855'),
('CMR', 'CMR', 'Cameroon', 'English, French', '+237'),
('CAN', 'CAD', 'Canada', 'English, French', '+1'),
('TCD', 'TCD', 'Chad', 'Arabic, French', '+235'),
('CHL', 'CLP', 'Chile', 'Spanish', '+56'),
('CHN', 'CNY', 'China', 'Chinese', '+86'),
('COL', 'COP', 'Colombia', 'Spanish', '+57'),
('COM', 'COM', 'Comoros', 'Comorian, Arabic, French', '+269'),
('COG', 'CDF', 'Congo', 'French', '+242'),
('COD', 'CDF', 'Democratic Republic of the Congo', 'French', '+243'),
('CRI', 'CRC', 'Costa Rica', 'Spanish', '+506'),
('CIV', 'CIV', 'Ivory Coast', 'French', '+225'),
('HRV', 'HRK', 'Croatia', 'Croatian', '+385'),
('CUB', 'CUP', 'Cuba', 'Spanish', '+53'),
('CYP', 'CYP', 'Cyprus', 'Greek, Turkish', '+357'),
('CZE', 'CZK', 'Czech Republic', 'Czech', '+420'),
('DNK', 'DKK', 'Denmark', 'Danish', '+45'),
('DJI', 'DJF', 'Djibouti', 'Arabic, French', '+253'),
('DMA', 'DMA', 'Dominica', 'English', '+1-767'),
('DOM', 'DOM', 'Dominican Republic', 'Spanish', '+1-809'),
('ECU', 'USD', 'Ecuador', 'Spanish', '+593'),
('EGY', 'EGP', 'Egypt', 'Arabic', '+20'),
('SLV', 'SVC', 'El Salvador', 'Spanish', '+503'),
('GNQ', 'GNQ', 'Equatorial Guinea', 'Spanish, French', '+240'),
('ERI', 'ERN', 'Eritrea', 'Tigrinya, Arabic, English', '+291'),
('EST', 'EST', 'Estonia', 'Estonian', '+372'),
('ETH', 'ETB', 'Ethiopia', 'Amharic', '+251'),
('FJI', 'FJD', 'Fiji', 'English, Fijian, Hindi', '+679'),
('FIN', 'FIN', 'Finland', 'Finnish, Swedish', '+358'),
('FRA', 'EUR', 'France', 'French', '+33'),
('GAB', 'GAB', 'Gabon', 'French', '+241'),
('GMB', 'GMB', 'Gambia', 'English', '+220'),
('GEO', 'GEO', 'Georgia', 'Georgian', '+995'),
('DEU', 'DEU', 'Germany', 'German', '+49'),
('GHA', 'GHS', 'Ghana', 'English', '+233'),
('GRC', 'GRD', 'Greece', 'Greek', '+30'),
('GRD', 'GRD', 'Grenada', 'English', '+1-473'),
('GTM', 'GTQ', 'Guatemala', 'Spanish', '+502'),
('GIN', 'GIN', 'Guinea', 'French', '+224'),
('GNB', 'GNB', 'Guinea-Bissau', 'Portuguese', '+245'),
('GUY', 'GUY', 'Guyana', 'English', '+592'),
('HTI', 'HTI', 'Haiti', 'Haitian Creole, French', '+509'),
('HND', 'HND', 'Honduras', 'Spanish', '+504'),
('HKG', 'HKG', 'Hong Kong', 'Chinese', '+852'),
('HUN', 'HUN', 'Hungary', 'Hungarian', '+36'),
('ISL', 'ISL', 'Iceland', 'Icelandic', '+354'),
('IND', 'INR', 'India', 'Hindi, English', '+91'),
('IDN', 'IDR', 'Indonesia', 'Indonesian', '+62'),
('IRN', 'IRR', 'Iran', 'Persian', '+98'),
('IRQ', 'IQD', 'Iraq', 'Arabic, Kurdish', '+964'),
('IRL', 'IRL', 'Ireland', 'Irish, English', '+353'),
('ISR', 'ISR', 'Israel', 'Hebrew, Arabic', '+972'),
('ITA', 'EUR', 'Italy', 'Italian', '+39'),
('JAM', 'JAM', 'Jamaica', 'English', '+1-876'),
('JPN', 'JPY', 'Japan', 'Japanese', '+81'),
('JOR', 'JOR', 'Jordan', 'Arabic', '+962'),
('KAZ', 'KAZ', 'Kazakhstan', 'Kazakh, Russian', '+7'),
('KEN', 'KES', 'Kenya', 'English, Swahili', '+254'),
('KIR', 'KIR', 'Kiribati', 'English', '+686'),
('KOR', 'KRW', 'South Korea', 'Korean', '+82'),
('KWT', 'KWT', 'Kuwait', 'Arabic', '+965'),
('KGZ', 'KGZ', 'Kyrgyzstan', 'Kyrgyz, Russian', '+996'),
('LAO', 'LAO', 'Laos', 'Lao', '+856'),
('LVA', 'LVL', 'Latvia', 'Latvian', '+371'),
('LBN', 'LBP', 'Lebanon', 'Arabic, French', '+961'),
('LSO', 'LSO', 'Lesotho', 'English, Sesotho', '+266'),
('LBR', 'LBR', 'Liberia', 'English', '+231'),
('LBY', 'LYD', 'Libya', 'Arabic', '+218'),
('LIE', 'LIE', 'Liechtenstein', 'German', '+423'),
('LTU', 'LTU', 'Lithuania', 'Lithuanian', '+370'),
('LUX', 'LUX', 'Luxembourg', 'Luxembourgish, French, German', '+352'),
('MKD', 'MKD', 'North Macedonia', 'Macedonian', '+389'),
('MDG', 'MDG', 'Madagascar', 'Malagasy, French', '+261'),
('MWI', 'MWK', 'Malawi', 'English, Chichewa', '+265'),
('MYS', 'MYR', 'Malaysia', 'Malay', '+60'),
('MDV', 'MAL', 'Maldives', 'Dhivehi', '+960'),
('MLI', 'MAL', 'Mali', 'French', '+223'),
('MLT', 'MLT', 'Malta', 'Maltese, English', '+356'),
('MHL', 'MHL', 'Marshall Islands', 'Marshallese, English', '+692'),
('MTQ', 'FRF', 'Martinique', 'French', '+596'),
('MRT', 'MRU', 'Mauritania', 'Arabic', '+222'),
('MUS', 'MUR', 'Mauritius', 'English, French', '+230'),
('MYT', 'MYT', 'Mayotte', 'French', '+262'),
('MEX', 'MXN', 'Mexico', 'Spanish', '+52'),
('FSM', 'FSM', 'Micronesia', 'English', '+691'),
('MDA', 'MDL', 'Moldova', 'Romanian', '+373'),
('MCO', 'MCO', 'Monaco', 'French', '+377'),
('MNG', 'MNG', 'Mongolia', 'Mongolian', '+976'),
('MNE', 'MNE', 'Montenegro', 'Montengrin', '+382'),
('MSR', 'MSR', 'Montserrat', 'English', '+1-664'),
('MAR', 'MAD', 'Morocco', 'Arabic', '+212'),
('MOZ', 'MZN', 'Mozambique', 'Portuguese', '+258'),
('MMR', 'MMR', 'Myanmar', 'Burmese', '+95'),
('NAM', 'NAM', 'Namibia', 'English', '+264'),
('NRU', 'NRU', 'Nauru', 'English, Nauruan', '+674'),
('NPL', 'NPR', 'Nepal', 'Nepali', '+977'),
('NLD', 'NLD', 'Netherlands', 'Dutch', '+31'),
('NCL', 'NCL', 'New Caledonia', 'French', '+687'),
('NZL', 'NZD', 'New Zealand', 'English', '+64'),
('NIC', 'NIK', 'Nicaragua', 'Spanish', '+505'),
('NER', 'NER', 'Niger', 'French', '+227'),
('NGA', 'NGN', 'Nigeria', 'English', '+234'),
('NIU', 'NIU', 'Niue', 'English', '+683'),
('PRK', 'KPW', 'North Korea', 'Korean', '+850'),
('MNP', 'MNP', 'Northern Mariana Islands', 'English', '+1-670'),
('NOR', 'NOK', 'Norway', 'Norwegian', '+47'),
('OMN', 'OMR', 'Oman', 'Arabic', '+968'),
('PAK', 'PKR', 'Pakistan', 'Urdu, English', '+92'),
('PLW', 'PLW', 'Palau', 'English', '+680'),
('PAN', 'PAN', 'Panama', 'Spanish', '+507'),
('PNG', 'PGK', 'Papua New Guinea', 'Tok Pisin, English', '+675'),
('PRT', 'PRT', 'Portugal', 'Portuguese', '+351'),
('PRI', 'PRT', 'Puerto Rico', 'Spanish', '+1-787'),
('QAT', 'QAT', 'Qatar', 'Arabic', '+974'),
('REU', 'REU', 'Réunion', 'French', '+262'),
('ROU', 'RON', 'Romania', 'Romanian', '+40'),
('RUS', 'RUB', 'Russia', 'Russian', '+7'),
('RWA', 'RWF', 'Rwanda', 'Kinyarwanda, French, English', '+250'),
('BLM', 'BLM', 'Saint Barthélemy', 'French', '+590'),
('KNA', 'KNA', 'Saint Kitts and Nevis', 'English', '+1-869'),
('LCA', 'LCA', 'Saint Lucia', 'English', '+1-758'),
('MAF', 'MAF', 'Saint Martin', 'French', '+590'),
('SPM', 'SPM', 'Saint Pierre and Miquelon', 'French', '+508'),
('VCT', 'VCT', 'Saint Vincent and the Grenadines', 'English', '+1-784'),
('WSM', 'WSM', 'Samoa', 'Samoan, English', '+685'),
('SMR', 'SMR', 'San Marino', 'Italian', '+378'),
('STP', 'STP', 'São Tomé and Príncipe', 'Portuguese', '+239'),
('SAU', 'SAR', 'Saudi Arabia', 'Arabic', '+966'),
('SEN', 'SEN', 'Senegal', 'French', '+221'),
('SRB', 'SRB', 'Serbia', 'Serbian', '+381'),
('SYC', 'SYC', 'Seychelles', 'English, French', '+248'),
('SLE', 'SLE', 'Sierra Leone', 'English', '+232'),
('SGP', 'SGP', 'Singapore', 'English, Malay, Mandarin', '+65'),
('SXM', 'SXM', 'Sint Maarten', 'Dutch', '+1-721'),
('SVK', 'SVK', 'Slovakia', 'Slovak', '+421'),
('SVN', 'SVN', 'Slovenia', 'Slovene', '+386'),
('SLB', 'SLB', 'Solomon Islands', 'English', '+677'),
('SOM', 'SOM', 'Somalia', 'Somali, Arabic', '+252'),
('ZAF', 'ZAR', 'South Africa', 'Afrikaans, English, Zulu', '+27'),
('SSD', 'SSP', 'South Sudan', 'English', '+211'),
('ESP', 'ESP', 'Spain', 'Spanish', '+34'),
('LKA', 'LKA', 'Sri Lanka', 'Sinhala, Tamil', '+94'),
('SDN', 'SDG', 'Sudan', 'Arabic, English', '+249'),
('SUR', 'SUR', 'Suriname', 'Dutch', '+597'),
('SJM', 'SJM', 'Svalbard and Jan Mayen', 'Norwegian', '+47'),
('SWE', 'SEK', 'Sweden', 'Swedish', '+46'),
('CHE', 'CHF', 'Switzerland', 'German, French, Italian', '+41'),
('SYR', 'SYR', 'Syria', 'Arabic', '+963'),
('TJK', 'TJS', 'Tajikistan', 'Tajik', '+992'),
('TZA', 'TZS', 'Tanzania', 'Swahili, English', '+255'),
('THA', 'THB', 'Thailand', 'Thai', '+66'),
('TGO', 'TGO', 'Togo', 'French', '+228'),
('TKM', 'TKM', 'Turkmenistan', 'Turkmen', '+993'),
('TON', 'TOP', 'Tonga', 'Tongan', '+676'),
('TTO', 'TTD', 'Trinidad and Tobago', 'English', '+1-868'),
('TUN', 'TUN', 'Tunisia', 'Arabic', '+216'),
('TUR', 'TRY', 'Turkey', 'Turkish', '+90'),
('TKL', 'TKL', 'Tokelau', 'English, Tokelauan', '+690'),
('TUV', 'TUV', 'Tuvalu', 'English', '+688'),
('UGA', 'UGX', 'Uganda', 'English, Swahili', '+256'),
('UKR', 'UAH', 'Ukraine', 'Ukrainian', '+380'),
('ARE', 'AED', 'United Arab Emirates', 'Arabic', '+971'),
('GBR', 'GBP', 'United Kingdom', 'English', '+44'),
('USA', 'USD', 'United States', 'English', '+1'),
('URY', 'UYU', 'Uruguay', 'Spanish', '+598'),
('UZB', 'UZS', 'Uzbekistan', 'Uzbek', '+998'),
('VUT', 'VUT', 'Vanuatu', 'Bislama, English, French', '+678'),
('VEN', 'VEF', 'Venezuela', 'Spanish', '+58'),
('VNM', 'VND', 'Vietnam', 'Vietnamese', '+84'),
('VGB', 'VGB', 'British Virgin Islands', 'English', '+1-284'),
('VIR', 'VIR', 'United States Virgin Islands', 'English', '+1-340'),
('WLF', 'WLF', 'Wallis and Futuna', 'French', '+681'),
('ESH', 'ESH', 'Western Sahara', 'Arabic', '+212'),
('YEM', 'YER', 'Yemen', 'Arabic', '+967'),
('ZMB', 'ZMW', 'Zambia', 'English', '+260'),
('ZWE', 'ZWL', 'Zimbabwe', 'English, Shona, Sindebele', '+263');

--states table creation----

  CREATE TABLE states (
  state_id INT AUTO_INCREMENT PRIMARY KEY, 
  state_code VARCHAR(10) NOT NULL,
  state_name VARCHAR(255) NOT NULL,
  country_id INT,
  isActive BOOLEAN DEFAULT 1,
  updated_by VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

--accounts table creation----

CREATE TABLE accounts (
account_id INT AUTO_INCREMENT PRIMARY KEY,
company_id VARCHAR(255) NOT NULL,
account_type ENUM('Domestic', 'International'),
bank_name VARCHAR(255) NOT NULL,
bank_address VARCHAR(255),
account_no VARCHAR(50) NOT NULL,
ifsc_code VARCHAR(20),
micr_code VARCHAR(20),
routing_no_swift_code VARCHAR(50),
bank_code VARCHAR(50), 
is_active BOOLEAN DEFAULT 1,
updated_by VARCHAR(255),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--client details creation----

CREATE TABLE client_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  industry_id INT,
  name VARCHAR(255),
  alias VARCHAR(255),
  pan_no VARCHAR(20), -- Adjusted to match typical PAN card format
  polestar_bank_account_id INT,
  gstn VARCHAR(15), -- GSTIN format remains valid
  salutation VARCHAR(20), -- Increased for diverse salutations
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(320), -- Maximum valid email length
  phone VARCHAR(20), -- Increased to handle country codes with phone numbers
  msa_flag BOOLEAN,
  is_performa BOOLEAN,
  msa_start_date VARCHAR(255),
  msa_end_date VARCHAR(255),
  non_solicitation_clause BOOLEAN,
  use_logo_permission BOOLEAN,
  client_category VARCHAR(100),
  servicing_type VARCHAR(100),
  missing_msa_deadline BOOLEAN,
  is_msa_missing BOOLEAN,
  logopath VARCHAR(500), -- Increased to accommodate longer file paths
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by VARCHAR(255),
  isActive TINYINT(1) DEFAULT 1
);


--client Billing Info creation----

CREATE TABLE client_billing_info (
  id int NOT NULL AUTO_INCREMENT,
  client_id int DEFAULT NULL,
  address1 varchar(255) NOT NULL,
  address2 varchar(255) DEFAULT NULL,
  address3 varchar(255) DEFAULT NULL,
  pin varchar(20) NOT NULL,
  country_id int NOT NULL,
  state_id int NOT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by int DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--client Shipping Info creation----

CREATE TABLE client_shipping_info (
  id int NOT NULL AUTO_INCREMENT,
  client_id int DEFAULT NULL,
  client_ship_to_address1 varchar(255) NOT NULL,
  client_ship_to_address2 varchar(255) DEFAULT NULL,
  client_ship_to_address3 varchar(255) DEFAULT NULL,
  client_ship_to_pin varchar(20) NOT NULL,
  client_ship_to_country_id int NOT NULL,
  client_ship_to_state_id int NOT NULL,
  client_ship_to_gstn varchar(50) DEFAULT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updated_by int DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- States for india----
INSERT INTO states (state_code, state_name, country_id, isActive, updated_by) 
VALUES
('AP', 'Andhra Pradesh', 505, 1, '1'),
('AR', 'Arunachal Pradesh', 505, 1, '1'),
('AS', 'Assam', 505, 1, '1'),
('BR', 'Bihar', 505, 1, '1'),
('CT', 'Chhattisgarh', 505, 1, '1'),
('GA', 'Goa', 505, 1, '1'),
('GJ', 'Gujarat', 505, 1, '1'),
('HR', 'Haryana', 505, 1, '1'),
('HP', 'Himachal Pradesh', 505, 1, '1'),
('JH', 'Jharkhand', 505, 1, '1'),
('KA', 'Karnataka', 505, 1, '1'),
('KL', 'Kerala', 505, 1, '1'),
('MP', 'Madhya Pradesh', 505, 1, '1'),
('MH', 'Maharashtra', 505, 1, '1'),
('MN', 'Manipur', 505, 1, '1'),
('ML', 'Meghalaya', 505, 1, '1'),
('MZ', 'Mizoram', 505, 1, '1'),
('NL', 'Nagaland', 505, 1, '1'),
('OR', 'Odisha', 505, 1, '1'),
('PB', 'Punjab', 505, 1, '1'),
('RJ', 'Rajasthan', 505, 1, '1'),
('SK', 'Sikkim', 505, 1, '1'),
('TN', 'Tamil Nadu', 505, 1, '1'),
('TG', 'Telangana', 505, 1, '1'),
('TR', 'Tripura', 505, 1, '1'),
('UP', 'Uttar Pradesh', 505, 1, '1'),
('UT', 'Uttarakhand', 505, 1, '1'),
('WB', 'West Bengal', 505, 1, '1'),
('AN', 'Andaman and Nicobar Islands', 505, 1, '1'),
('CH', 'Chandigarh', 505, 1, '1'),
('DN', 'Dadra and Nagar Haveli and Daman and Diu', 505, 1, '1'),
('DL', 'Delhi', 505, 1, '1'),
('JK', 'Jammu and Kashmir', 505, 1, '1'),
('LA', 'Ladakh', 505, 1, '1'),
('LD', 'Lakshadweep', 505, 1, '1'),
('PY', 'Puducherry', 505, 1, '1');
