// Copyright (c) 2023, innocent P M and contributors
// For license information, please see license.txt

frappe.ui.form.on('Member', {
	height: function(frm) {
		if (frm.doc.height && frm.doc.weight) {
			calculate_bmi(frm);
		}
	},

	weight: function(frm) {
		if (frm.doc.height && frm.doc.weight) {
			calculate_bmi(frm);
		}
	},

	onload: function(frm) {
        // Get the birthdate value from the form
        var birthdate = frm.doc.dob;

        // Calculate the age based on the birthdate
        if (birthdate) {
            var today = frappe.datetime.get_today();
            var age = frappe.datetime.get_diff(today, birthdate) / 365; // Assuming a year is 365 days

            // Check if the age is 18 or older
            if (age < 18) {
                frappe.msgprint(str('You must be 18 years or older to create this record.'));
                frm.set_value('dob', ''); // Clear the birthdate field
            } else {				
                frappe.msgprint(str('You are eligible to be registered in our GYM App.'));
                frm.set_value('age', age); // Set the age field
            }
        }
    }
});

let calculate_bmi = function(frm) {
	// Calculate BMI (Body Mass Index)
	// BMI = weight (in Kg) / (height * height) (in Meter)
	let bmi = (frm.doc.weight / (frm.doc.height * frm.doc.height)).toFixed(2);
	let bmi_note = null;

	if (bmi < 18.5) {
		bmi_note = __('Underweight');
	} else if (bmi >= 18.5 && bmi < 25) {
		bmi_note = __('Normal');
	} else if (bmi >= 25 && bmi < 30) {
		bmi_note = __('Overweight');
	} else if (bmi >= 30) {
		bmi_note = __('Obese');
	}

	// Set BMI and BMI Status fields in the form
	frappe.model.set_value(frm.doctype, frm.docname, 'bmi', bmi);
	frappe.model.set_value(frm.doctype, frm.docname, 'bmi_status', bmi_note);
};
