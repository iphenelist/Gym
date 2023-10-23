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
});