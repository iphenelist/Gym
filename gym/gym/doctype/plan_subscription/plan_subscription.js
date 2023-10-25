// Copyright (c) 2023, innocent P M and contributors
// For license information, please see license.txt


// Populate the child table element
frappe.ui.form.on('Plan Subscription', {
	plan_name: (frm) => {
		frappe.db.get_list('Workout Plan Exercise', {
			fields: ['day', 'exercise'], 
			filters: {
				parent: frm.doc.plan_name
			}
		}).then((records) => {
			console.log(records);
			for (const d of records) {
				let row = frm.add_child("plan_details", {
					exercise: d.exercise,
					day: d.day, 
				});
			}
			frm.refresh_field('plan_details');
		});
	}
});
