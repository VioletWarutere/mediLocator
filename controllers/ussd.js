const create_ussd = ('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';

    if (text === '') {
        // First request
        response = `CON Welcome to MedLocator! Kindly input your location:`;
    } 
    else if (text.toLowerCase() === 'nairobi') {
        // Location entered is Nairobi (we use .toLowerCase() to handle case insensitivity)
        response = `CON Which service would you like to access?
        1. Emergency Assistance
        2. Find a doctor
        3. Book an appointment`;
    } 
    else if (text === '1') {
        // Emergency Assistance
        const emergencyNumber = '911'; // Replace with the actual emergency number
        response = `END Call ${emergencyNumber} for emergency assistance.The closest ambulance has been contacted and is on its way`;
    } 
    else if (text === '2') {
        // Find a doctor (this lists hospitals)
        let hospitalList = hospitals.map((hospital, index) => `${index + 1}. ${hospital}`).join('\n');
        response = `END Here is a list of hospitals sorted by distance:\n${hospitalList}`;
    } 
    else if (text === '3') {
        // Book an appointment
        response = `CON Kindly choose the service you are looking for:
        1. Cardiology
        2. Physiology
        3. X-ray`;
    } 
    else if (text === '3*1') {
        // Cardiology doctors
        let doctorList = ['Dr. John Doe', 'Dr. Jane Smith'].map((doc, index) => `${index + 1}. ${doc}`).join('\n');
        response = `END Here is a list of cardiologists in your area:\n${doctorList}`;
    } 
    else {
        // Default response if location or input is not recognized
        response = `END Sorry, we currently don't have access to hospitals in this area. Call ${phoneNumber} for more information.`;
    }

    // Send the response back to the API
    res.set('Content-Type', 'text/plain');
    res.send(response);
});
module.exports = create_ussd;