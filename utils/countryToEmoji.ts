export default function (countryName) {
	const countryCodes = {
		Afghanistan: 'AF',
		Albania: 'AL',
		Algeria: 'DZ',
		Argentina: 'AR',
		Australia: 'AU',
		Austria: 'AT',
		Bangladesh: 'BD',
		Belgium: 'BE',
		Brazil: 'BR',
		Canada: 'CA',
		China: 'CN',
		Colombia: 'CO',
		Croatia: 'HR',
		Cuba: 'CU',
		'Czech Republic': 'CZ',
		Denmark: 'DK',
		Egypt: 'EG',
		Ethiopia: 'ET',
		Finland: 'FI',
		France: 'FR',
		Germany: 'DE',
		Greece: 'GR',
		Hungary: 'HU',
		India: 'IN',
		Indonesia: 'ID',
		Iran: 'IR',
		Iraq: 'IQ',
		Ireland: 'IE',
		Israel: 'IL',
		Italy: 'IT',
		Jamaica: 'JM',
		Japan: 'JP',
		Kenya: 'KE',
		Malaysia: 'MY',
		Mexico: 'MX',
		Morocco: 'MA',
		Netherlands: 'NL',
		'New Zealand': 'NZ',
		Nigeria: 'NG',
		Norway: 'NO',
		Pakistan: 'PK',
		Peru: 'PE',
		Philippines: 'PH',
		Poland: 'PL',
		Portugal: 'PT',
		Romania: 'RO',
		Russia: 'RU',
		'Saudi Arabia': 'SA',
		Singapore: 'SG',
		'South Africa': 'ZA',
		'South Korea': 'KR',
		Spain: 'ES',
		'Sri Lanka': 'LK',
		Sweden: 'SE',
		Switzerland: 'CH',
		Taiwan: 'TW',
		Thailand: 'TH',
		Turkey: 'TR',
		Ukraine: 'UA',
		'United Arab Emirates': 'AE',
		'United Kingdom': 'GB',
		'United States': 'US',
		Vietnam: 'VN',
		Zimbabwe: 'ZW',
	};

	const countryCode = countryCodes[countryName];

	if (!countryCode) {
		return '🏴‍☠️';
	}

	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt(0))
		.join(' ');

	return String.fromCodePoint(...codePoints.split(' '));
}
