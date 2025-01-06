import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import InputSelectField from "../InputSelectField";
import { operators } from "../fakeData";
const validationSchema = Yup.object({
	auditItems: Yup.array()
		.of(
			Yup.object({
				description: Yup.string().required("Description is required"),
				responsibilities: Yup.string().required(
					"Responsibilities are required"
				),
			})
		)
		.min(1, "At least one item is required"),
});

const DynamicForm = () => {
	return (
		<Formik
			initialValues={{
				group: "",
				shift: "",
				date: "",
				auditItems: [{ description: "", responsibilities: "" }],
				reaction: "",
				pacCru: "",
				bmSignature: "",
				sruSignature: "",
				ssmSignature: "",
			}}
			validationSchema={validationSchema}
			onSubmit={(values) => console.log("Form Values:", values)}
		>
			{({ values, setFieldValue, errors, touched }) => (
				<Form className="p-4 space-y-6">
					<h2 className="text-xl font-bold text-center">
						{" "}
						RELIEF STREAM AUDIT (D1-508 INLET STREAMS)
					</h2>
					<div className="grid grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Shift Group
							</label>
							<Field
								as="select"
								name="group"
								className="p-2 border border-gray-300 rounded-md w-full"
							>
								<option value="" disabled>
									Select a group
								</option>
								<option value="Group A">Group A</option>
								<option value="Group B">Group B</option>
								<option value="Group C">Group C</option>
							</Field>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Shift
							</label>
							<Field
								as="select"
								name="shift"
								className="p-2 border border-gray-300 rounded-md w-full"
							>
								<option value="" disabled>
									Select a Shift
								</option>
								<option value="Morning">Morning</option>
								<option value="Evening">Evening</option>
								<option value="Night">Night</option>
							</Field>
						</div>
						<div>
							<label
								htmlFor="date"
								className="block text-sm font-medium text-gray-700"
							>
								Date
							</label>
							<Field
								name="date"
								type="date"
								className="p-1 border border-gray-300 rounded-md w-full"
							/>
							{touched.date && errors.date && (
								<div className="text-danger text-sm">{errors.date}</div>
							)}
						</div>
					</div>
					<FieldArray name="auditItems">
						{({ remove, push }) => (
							<div className="space-y-4 border border-gray-300 rounded-md p-2">
								{/* Header Row */}
								<div className="flex items-center gap-4 ">
									<div className="w-1/12 font-semibold">Sr. No</div>
									<div className="w-8/12 font-semibold">Description</div>
									<div className="w-3/12 font-semibold">Responsibilities</div>
									<div className="w-1/12"></div>
								</div>

								{/* Dynamic Rows */}
								{values.auditItems.map((item, index) => (
									<div key={index} className="flex items-center gap-4 ">
										{/* Sr. No */}
										<div className="w-1/12">
											<Field
												type="text"
												name={`auditItems[${index}].srNo`}
												value={index + 1}
												disabled
												className="p-2 border border-gray-300 rounded-md w-full"
											/>
										</div>
										{/* Description */}
										<div className="w-8/12">
											<Field
												type="text"
												name={`auditItems[${index}].description`}
												placeholder="Description"
												className="p-2 border border-gray-300 rounded-md w-full"
											/>
											{touched.auditItems &&
												touched.auditItems[index] &&
												errors.auditItems?.[index]?.description && (
													<div className="text-sm text-red-500">
														{errors.auditItems[index].description}
													</div>
												)}
										</div>
										{/* Responsibilities */}
										<div className="w-3/12">
											<Field
												type="text"
												name={`auditItems[${index}].responsibilities`}
												placeholder="Responsibilities"
												className="p-2 border border-gray-300 rounded-md w-full"
											/>
											{touched.auditItems &&
												touched.auditItems[index] &&
												errors.auditItems?.[index]?.responsibilities && (
													<div className="text-sm text-red-500">
														{errors.auditItems[index].responsibilities}
													</div>
												)}
										</div>
										{/* Remove Button */}
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

								<div className="flex justify-start ">
									<button
										type="button"
										onClick={() =>
											push({ description: "", responsibilities: "" })
										}
										className="bg-primary text-white px-4 py-2 rounded hover:bg-info mt-4"
									>
										Add Row
									</button>
								</div>
							</div>
						)}
					</FieldArray>

					<div className="space-y-6 mt-6">
						<div className="grid grid-cols-5 gap-4">
							<div className="w-full">
								<label
									htmlFor="reaction"
									className="block text-sm font-medium text-gray-700"
								>
									Reaction
								</label>
								<Field
									name="reaction"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.reaction && errors.reaction && (
									<div className="text-danger text-sm">{errors.reaction}</div>
								)}
							</div>
							<div className="w-full">
								<label
									htmlFor="pacCru"
									className="block text-sm font-medium text-gray-700"
								>
									PAC/CRU
								</label>
								<Field
									name="pacCru"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.pacCru && errors.pacCru && (
									<div className="text-danger text-sm">{errors.pacCru}</div>
								)}
							</div>
							<div className="w-full">
								<label
									htmlFor="bmSignature"
									className="block text-sm font-medium text-gray-700"
								>
									B/M Signature
								</label>

								<Field
									name="bmSignature"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.bmSignature && errors.bmSignature && (
									<div className="text-danger text-sm">
										{errors.bmSignature}
									</div>
								)}
							</div>
							<div>
								<label
									htmlFor="sruSignature"
									className="block text-sm font-medium text-gray-700"
								>
									SRU Signature
								</label>

								<Field
									name="sruSignature"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.sruSignature && errors.sruSignature && (
									<div className="text-danger text-sm">
										{errors.sruSignature}
									</div>
								)}
							</div>

							<div>
								<label
									htmlFor="ssmSignature"
									className="block text-sm font-medium text-gray-700"
								>
									SSM Signature
								</label>

								<Field
									name="passmSignaturecCru"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.ssmSignature && errors.ssmSignature && (
									<div className="text-danger text-sm">
										{errors.ssmSignature}
									</div>
								)}
							</div>
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

export default DynamicForm;
