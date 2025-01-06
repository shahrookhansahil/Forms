import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import InputSelectField from "../InputSelectField";
import { operators } from "../fakeData";
const validationSchema = Yup.object({
	auditItems: Yup.array()
		.of(
			Yup.object({
				concern: Yup.string().required("concern is required"),
			})
		)
		.min(1, "At least one item is required"),
});

const ElectricalAuditArea = () => {
	return (
		<Formik
			initialValues={{
				group: "",
				shift: "",
				date: "",
				auditItems: [{ concern: "" }],
				reaction: "",
				pacCru: "",
				solvent_recovery: "",
				to_field: "",
				shift_manager: "",
			}}
			validationSchema={validationSchema}
			onSubmit={(values) => console.log("Form Values:", values)}
		>
			{({ values, setFieldValue, errors, touched }) => (
				<Form className="p-4 space-y-6">
					<h2 className="text-xl font-bold text-center">
						{" "}
						Electrical Audit of Area Report
					</h2>
					<div className="grid grid-cols-2 gap-4">
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
									<div className="w-11/12 font-semibold">concern</div>
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
										{/* concern */}
										<div className="w-10/12">
											<Field
												type="text"
												name={`auditItems[${index}].concern`}
												placeholder="concern"
												className="p-2 border border-gray-300 rounded-md w-full"
											/>
											{touched.auditItems &&
												touched.auditItems[index] &&
												errors.auditItems?.[index]?.concern && (
													<div className="text-sm text-red-500">
														{errors.auditItems[index].concern}
													</div>
												)}
										</div>
										{/* Responsibilities */}

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
										onClick={() => push({ concern: "" })}
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
									PAC/Dryer
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
									htmlFor="solvent_recovery"
									className="block text-sm font-medium text-gray-700"
								>
									Solvent Recovery
								</label>

								<Field
									name="solvent_recovery"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.solvent_recovery && errors.solvent_recovery && (
									<div className="text-danger text-sm">
										{errors.solvent_recovery}
									</div>
								)}
							</div>
							<div>
								<label
									htmlFor="to_field"
									className="block text-sm font-medium text-gray-700"
								>
									T.O
								</label>

								<Field
									name="to_field"
									className="p-1 border border-gray-300 rounded-md w-full"
								/>
								{touched.to_field && errors.to_field && (
									<div className="text-danger text-sm">{errors.to_field}</div>
								)}
							</div>

							<div>
								<label
									htmlFor="shift_manager"
									className="block text-sm font-medium text-gray-700"
								>
									SHIFT MANAGER
								</label>
								<InputSelectField
									operators={operators}
									values={values}
									setFieldValue={setFieldValue}
									id="shift_manager"
									errors={errors}
									touched={touched}
								/>
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

export default ElectricalAuditArea;
