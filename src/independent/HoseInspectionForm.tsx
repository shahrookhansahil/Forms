import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

const HoseInspectionForm = () => {
	const validationSchema = Yup.object({
		inspections: Yup.array()
			.of(
				Yup.object({
					sr: Yup.string().required("Required"),
					rawWaterHoses: Yup.object({
						quantity: Yup.number()
							.required("Required")
							.min(0, "Must be a positive number"),
						inspDate: Yup.date().required("Required"),
						dueDate: Yup.date().required("Required"),
					}),
					airHoses: Yup.object({
						quantity: Yup.number()
							.required("Required")
							.min(0, "Must be a positive number"),
						inspDate: Yup.date().required("Required"),
						dueDate: Yup.date().required("Required"),
					}),
					chemicalHoses: Yup.object({
						quantity: Yup.number()
							.required("Required")
							.min(0, "Must be a positive number"),
						inspDate: Yup.date().required("Required"),
						dueDate: Yup.date().required("Required"),
					}),
					checkCoupling: Yup.string().required("Required"),
					checkRupture: Yup.string().required("Required"),
					checkLeakage: Yup.string().required("Required"),
					whipCheck: Yup.string().required("Required"),
				})
			)
			.min(1, "At least one inspection is required"),
	});

	const initialValues = {
		inspections: [
			{
				sr: "",
				rawWaterHoses: { quantity: "", inspDate: "", dueDate: "" },
				airHoses: { quantity: "", inspDate: "", dueDate: "" },
				chemicalHoses: { quantity: "", inspDate: "", dueDate: "" },
				checkCoupling: "Ok",
				checkRupture: "Ok",
				checkLeakage: "Ok",
				whipCheck: "Ok",
				remarks: "",
			},
		],
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => console.log("Form Values:", values)}
		>
			{({ values, errors, touched }) => (
				<Form className="p-4 space-y-4">
					<h2 className="text-xl font-bold text-center">
						Routine Area Audit For Hoses{" "}
					</h2>
					<FieldArray name="inspections">
						{({ remove, push }) => (
							<>
								{values.inspections.map((inspection, index) => (
									<div
										key={index}
										className="p-4 border border-gray-300 rounded-md shadow-md space-y-4"
									>
										<div className="flex justify-end ">
											<button
												type="button"
												className="bg-danger text-white w-8 h-8 rounded hover:bg-dangerDark"
												onClick={() => remove(index)}
											>
												X
											</button>
										</div>
										<div className="flex space-x-4">
											<div className="w-1/12">
												<label>Sr #</label>
												<Field
													name={`inspections[${index}].sr`}
													className="p-2 "
													value={index + 1}
													disabled
													placeholder="Sr #"
												/>
											</div>
											{["Raw Water Hoses", "Air Hoses", "Chemical Hoses"].map(
												(hoseType, hoseIndex) => {
													const hoseKey = [
														"rawWaterHoses",
														"airHoses",
														"chemicalHoses",
													][hoseIndex];
													return (
														<div key={hoseIndex} className="w-1/4">
															<h4 className="font-semibold">{hoseType}</h4>
															<div>
																<label>Quantity</label>
																<Field
																	name={`inspections[${index}].${hoseKey}.quantity`}
																	className="p-2 border rounded w-full"
																	type="number"
																	placeholder="Quantity"
																/>
															</div>
															<div>
																<label>Insp Date</label>
																<Field
																	name={`inspections[${index}].${hoseKey}.inspDate`}
																	className="p-2 border rounded w-full"
																	type="date"
																/>
															</div>
															<div>
																<label>Due Date</label>
																<Field
																	name={`inspections[${index}].${hoseKey}.dueDate`}
																	className="p-2 border rounded w-full"
																	type="date"
																/>
															</div>
														</div>
													);
												}
											)}
										</div>
										<div className="flex space-x-4">
											{[
												"checkCoupling",
												"checkRupture",
												"checkLeakage",
												"whipCheck",
											].map((checkKey, checkIndex) => (
												<div key={checkIndex} className="w-1/4">
													<label>
														{checkKey
															.replace("check", "")
															.replace(/([A-Z])/g, " $1")}
													</label>
													<Field
														name={`inspections[${index}].${checkKey}`}
														as="select"
														className="p-2 border rounded w-full"
													>
														<option value="Ok">Ok</option>
														<option value="N.OK">N.OK</option>
													</Field>
												</div>
											))}
										</div>
									</div>
								))}
								<button
									type="button"
									className="bg-primary text-white px-4 py-2 rounded hover:bg-info mt-4"
									onClick={() =>
										push({
											sr: "",
											rawWaterHoses: {
												quantity: "",
												inspDate: "",
												dueDate: "",
											},
											airHoses: { quantity: "", inspDate: "", dueDate: "" },
											chemicalHoses: {
												quantity: "",
												inspDate: "",
												dueDate: "",
											},
											checkCoupling: "Ok",
											checkRupture: "Ok",
											checkLeakage: "Ok",
											whipCheck: "Ok",
										})
									}
								>
									Add Inspection
								</button>
							</>
						)}
					</FieldArray>
					<div>
						<label htmlFor="remarks" className="block text-sm font-medium">
							Remarks
						</label>
						<Field
							name="remarks"
							as="textarea"
							rows="4"
							className="p-2 border border-gray-300 rounded-md w-full"
						/>
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

export default HoseInspectionForm;
