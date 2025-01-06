import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import InputSelectField from "../InputSelectField";
import { operators } from "../fakeData";
const RoutineAreaHosesAudit = () => {
	const initialValues = {
		preparedBy: "",
		reviewedBy: "",
		date: "",
		shift: "",
		inspections: [
			{
				sr: "",
				area: "",
				location: "",
				purpose: "",
				inspectionDate: "",
				dueDate: "",
				size: "",
				couplings: "OK",
				anyDamage: "No",
				anyLeakage: "No",
				whipCheck: "OK",
				remarks: "",
			},
		],
	};

	const validationSchema = Yup.object({
		inspections: Yup.array().of(
			Yup.object({
				sr: Yup.string().required("Required"),
				area: Yup.string().required("Required"),
				location: Yup.string().required("Required"),
				purpose: Yup.string().required("Required"),
				inspectionDate: Yup.date().required("Required"),
				dueDate: Yup.date().required("Required"),
				size: Yup.string().required("Required"),
				couplings: Yup.string().required("Required"),
				anyDamage: Yup.string().required("Required"),
				anyLeakage: Yup.string().required("Required"),
				whipCheck: Yup.string().required("Required"),
				remarks: Yup.string(),
			})
		),
	});

	return (
		<Formik
			initialValues={initialValues}
			// validationSchema={validationSchema}
			onSubmit={(values) => console.log("Form Values:", values)}
		>
			{({ values, setFieldValue, errors, touched }) => (
				<Form className="p-6 space-y-6">
					<h2 className="text-2xl font-bold text-center">
						Routine Area Hoses Audit (Monthly - 1st Saturday Morning )
					</h2>
					<div className="grid grid-cols-4 gap-4">
						<div>
							<label
								htmlFor="preparedBy"
								className="block text-sm font-medium text-gray-700"
							>
								Prepared By
							</label>
							<InputSelectField
								operators={operators}
								values={values}
								id="preparedBy"
								setFieldValue={setFieldValue}
								errors={errors}
								touched={touched}
							/>
						</div>
						<div>
							<label
								htmlFor="reviewedBy"
								className="block text-sm font-medium text-gray-700"
							>
								Reviewed By
							</label>
							<InputSelectField
								operators={operators}
								values={values}
								id="reviewedBy"
								setFieldValue={setFieldValue}
								errors={errors}
								touched={touched}
							/>
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
							<label className="block text-sm font-medium text-gray-700">
								Date
							</label>
							<Field
								name="date"
								type="datetime-local"
								className="p-1 border border-gray-300 rounded-md w-full"
							/>
							{touched.date && errors.date && (
								<div className="text-danger text-sm">
									{typeof errors.date === "string" && errors.date}
								</div>
							)}
						</div>
					</div>
					<FieldArray name="inspections">
						{({ remove, push }) => (
							<div className="space-y-6">
								{values.inspections.map((inspection, index) => (
									<div
										key={index}
										className="p-4 border rounded-md space-y-4 bg-gray-50"
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
										<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4">
											{/* Sr # */}
											<div className="col-span-1">
												<label
													htmlFor={`inspections[${index}].sr`}
													className="block text-sm font-medium text-gray-700"
												>
													Sr #
												</label>
												<Field
													name={`inspections[${index}].sr`}
													placeholder="Sr #"
													value={index + 1}
													disabled
													className="mt-1 p-2 w-full border rounded-md"
												/>
											</div>

											{/* Area */}
											<div className="col-span-2">
												<label
													htmlFor={`inspections[${index}].area`}
													className="block text-sm font-medium text-gray-700"
												>
													Area
												</label>
												<Field
													name={`inspections[${index}].area`}
													placeholder="Area"
													className="mt-1 p-2 w-full border rounded-md"
												/>
											</div>

											{/* Location */}
											<div className="col-span-4">
												<label
													htmlFor={`inspections[${index}].location`}
													className="block text-sm font-medium text-gray-700"
												>
													Location
												</label>
												<Field
													name={`inspections[${index}].location`}
													placeholder="Location"
													className="mt-1 p-2 w-full border rounded-md"
												/>
											</div>

											{/* Purpose */}
											<div className="col-span-5">
												<label
													htmlFor={`inspections[${index}].purpose`}
													className="block text-sm font-medium text-gray-700"
												>
													Purpose
												</label>
												<Field
													name={`inspections[${index}].purpose`}
													placeholder="Purpose"
													className="mt-1 p-2 w-full border rounded-md"
												/>
											</div>

											{/* Inspection Date */}
											<div className="col-span-2">
												<label
													htmlFor={`inspections[${index}].inspectionDate`}
													className="block text-sm font-medium text-gray-700"
												>
													Inspection Date
												</label>
												<Field
													name={`inspections[${index}].inspectionDate`}
													type="date"
													className="mt-1 p-2 w-full border rounded-md"
												/>
											</div>

											{/* Due Date */}
											<div className="col-span-2">
												<label
													htmlFor={`inspections[${index}].dueDate`}
													className="block text-sm font-medium text-gray-700"
												>
													Due Date
												</label>
												<Field
													name={`inspections[${index}].dueDate`}
													type="date"
													className="mt-1 p-2 w-full border rounded-md"
												/>
											</div>

											{/* Size */}
											<div className="col-span-1">
												<label
													htmlFor={`inspections[${index}].size`}
													className="block text-sm font-medium text-gray-700"
												>
													Size
												</label>
												<Field
													name={`inspections[${index}].size`}
													placeholder="Size"
													className="mt-1 p-2 w-full border rounded-md"
												/>
											</div>

											{/* Couplings */}
											<div className="col-span-1">
												<label
													htmlFor={`inspections[${index}].couplings`}
													className="block text-sm font-medium text-gray-700"
												>
													Couplings
												</label>
												<Field
													name={`inspections[${index}].couplings`}
													as="select"
													className="mt-1 p-2 w-full border rounded-md"
												>
													<option value="OK">OK</option>
													<option value="Not OK">Not OK</option>
												</Field>
											</div>

											{/* Any Damage */}
											<div className="col-span-1">
												<label
													htmlFor={`inspections[${index}].anyDamage`}
													className="block text-sm font-medium text-gray-700"
												>
													Any Damage
												</label>
												<Field
													name={`inspections[${index}].anyDamage`}
													as="select"
													className="mt-1 p-2 w-full border rounded-md"
												>
													<option value="No">No</option>
													<option value="Yes">Yes</option>
												</Field>
											</div>

											{/* Any Leakage */}
											<div className="col-span-1">
												<label
													htmlFor={`inspections[${index}].anyLeakage`}
													className="block text-sm font-medium text-gray-700"
												>
													Any Leakage
												</label>
												<Field
													name={`inspections[${index}].anyLeakage`}
													as="select"
													className="mt-1 p-2 w-full border rounded-md"
												>
													<option value="No">No</option>
													<option value="Yes">Yes</option>
												</Field>
											</div>

											{/* Whip Check */}
											<div className="col-span-1">
												<label
													htmlFor={`inspections[${index}].whipCheck`}
													className="block text-sm font-medium text-gray-700"
												>
													Whip Check
												</label>
												<Field
													name={`inspections[${index}].whipCheck`}
													as="select"
													className="mt-1 p-2 w-full border rounded-md"
												>
													<option value="OK">OK</option>
													<option value="Not OK">Not OK</option>
												</Field>
											</div>

											{/* Remarks */}
											<div className="col-span-3">
												<label
													htmlFor={`inspections[${index}].remarks`}
													className="block text-sm font-medium text-gray-700"
												>
													Remarks
												</label>
												<Field
													name={`inspections[${index}].remarks`}
													placeholder="Remarks"
													className="mt-1 p-2 w-full border rounded-md"
												/>
											</div>
										</div>
									</div>
								))}

								<button
									type="button"
									className="bg-primary text-white px-4 py-2 rounded hover:bg-info mt-4"
									onClick={() =>
										push({
											sr: "",
											area: "",
											location: "",
											purpose: "",
											inspectionDate: "",
											dueDate: "",
											size: "",
											couplings: "OK",
											anyDamage: "No",
											anyLeakage: "No",
											whipCheck: "OK",
											remarks: "",
										})
									}
								>
									Add Field
								</button>
							</div>
						)}
					</FieldArray>
					<div className="flex justify-end ">
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

export default RoutineAreaHosesAudit;
