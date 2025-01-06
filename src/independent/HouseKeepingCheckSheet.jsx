import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import { auditItemsData } from "../fakeData";
const auditData = auditItemsData.map((item) => ({
	...item,
	response: "",
	remarks: "",
}));

const validationSchema = Yup.object({
	auditItems: Yup.array()
		.of(
			Yup.object({
				description: Yup.string().required("Description is required"),
				response: Yup.string().required("Response (Yes/No) is required"),
			})
		)
		.min(1, "At least one item is required"),
	plant: Yup.string().required("Plant is required"),
	date: Yup.date().required("Date is required"),
	remarks: Yup.string(),
	shiftManagerSignature: Yup.string(),
	operatorsSignatures: Yup.string(),
});

const HouseKeepingCheckSheet = () => {
	return (
		<Formik
			initialValues={{
				plant: "",
				date: "",
				auditItems: auditData,
				remarks: "",
				shiftManagerSignature: "",
				operatorsSignatures: "",
			}}
			// validationSchema={validationSchema}
			onSubmit={(values) => console.log("Form Values:", values)}
		>
			{({ values, errors, touched }) => (
				<Form className="p-4 space-y-6">
					<h2 className="text-xl font-bold text-center">
						Area House Keeping Check Sheet
					</h2>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Plant
							</label>
							<Field
								name="plant"
								type="text"
								className="p-2 border border-gray-300 rounded-md w-full"
							/>
							{touched.plant && errors.plant && (
								<div className="text-sm text-red-500">{errors.plant}</div>
							)}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Date
							</label>
							<Field
								name="date"
								type="date"
								className="p-2 border border-gray-300 rounded-md w-full"
							/>
							{touched.date && errors.date && (
								<div className="text-sm text-red-500">{errors.date}</div>
							)}
						</div>
					</div>

					<FieldArray name="auditItems">
						{({ remove, push }) => (
							<div className="space-y-4 border border-gray-300 rounded-md p-4">
								{/* Header Row */}
								<div className="flex items-center gap-4 font-semibold text-gray-700 border-b pb-2">
									<div className="w-1/12">Sr. No</div>
									<div className="w-7/12">Audit Point</div>
									<div className="w-1/12">Response</div>
									<div className="w-3/12">Remarks</div>
									<div className="w-1/12"></div>
								</div>

								{/* Dynamic Rows */}
								{values.auditItems.map((item, index) => (
									<div key={index} className="flex items-center gap-4">
										<div className="w-1/12">{index + 1}</div>
										<div className="w-7/12">
											<Field
												name={`inspections[${index}].description`}
												className="p-2 w-full border border-gray-300 rounded-md"
												value={item.description}
												placeholder="Audit Point"
											/>
										</div>
										<div className="w-1/12">
											<Field
												as="select"
												name={`auditItems[${index}].response`}
												className="p-2 border border-gray-300 rounded-md w-full"
											>
												<option value="">Select</option>
												<option value="Yes">Yes</option>
												<option value="No">No</option>
											</Field>
											{touched.auditItems &&
												touched.auditItems[index] &&
												errors.auditItems?.[index]?.response && (
													<div className="text-sm text-red-500">
														{errors.auditItems[index].response}
													</div>
												)}
										</div>
										<div className="w-3/12">
											<Field
												as="textarea"
												name={`auditItems[${index}].remarks`}
												className="px-2 border border-gray-300 rounded-md w-full"
											/>
										</div>
										<div className="w-1/12 flex justify-end">
											<button
												type="button"
												onClick={() => remove(index)}
												className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
											>
												X
											</button>
										</div>
									</div>
								))}

								<div className="flex justify-start">
									<button
										type="button"
										onClick={() =>
											push({
												description: "",
												remarks: "",
												response: "",
											})
										}
										className="bg-primary text-white px-4 py-2 rounded hover:bg-info mt-4"
									>
										Add Audit Item
									</button>
								</div>
							</div>
						)}
					</FieldArray>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Shift Manager's Comments / Signature
							</label>
							<Field
								name="shiftManagerSignature"
								className="p-2 border border-gray-300 rounded-md w-full"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Operators' Signatures
							</label>
							<Field
								name="operatorsSignatures"
								className="p-2 border border-gray-300 rounded-md w-full"
							/>
						</div>
					</div>

					<div className="flex justify-end mt-6">
						<button
							type="submit"
							className="bg-success text-white px-6 py-3 rounded-md hover:bg-successDark"
						>
							Submit
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default HouseKeepingCheckSheet;
