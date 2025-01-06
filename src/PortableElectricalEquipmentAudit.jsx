import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import InputSelectField from "./InputSelectField";
import { areaTagdata, operators } from "./fakeData";

const auditControlValvesData = areaTagdata.map((area) => ({
	...area,
	tags: area.tags.map((tag) => ({
		...tag,
		dcsSignal: "",
		opening: "",
	})),
}));
const PortableElectricalEquipmentAudit = () => {
	const [selectedAreas, setSelectedAreas] = useState([]);
	const validationSchema = Yup.object({
		preparedBy: Yup.string()
			.required("Prepared By is required")
			.oneOf(operators, "Invalid operator name"),
		reviewedBy: Yup.string()
			.required("Reviewed By is required")
			.oneOf(operators, "Invalid operator name"),
		date: Yup.date().required("Date is required"),
		areas: Yup.array()
			.of(
				Yup.object({
					name: Yup.string().required("Area name is required"),
					concerns: Yup.array()
						.of(
							Yup.object({
								concern: Yup.string().required("Concern is required"),
								operator: Yup.string().required(
									"Operator Signature is required"
								),
							})
						)
						.min(1, "At least one Concern is required")
						.required("Concerns are required"),
				})
			)
			.min(1, "At least one area is required")
			.required("Areas are required"),
	});

	return (
		<Formik
			initialValues={{
				preparedBy: "",
				reviewedBy: "",
				date: "",
				areas: [{ name: "", concerns: [{ concern: "", operator: "" }] }],
				ssm_signature: "",
			}}
			validationSchema={validationSchema}
			onSubmit={(values) => console.log("Form Values:", values)}
		>
			{({ values, setFieldValue, errors, touched }) => (
				<Form className="p-4 space-y-6">
					<h2 className="text-xl font-bold text-center">
						PORTABLE ELECTRICAL EQUIPMENT AUDIT
					</h2>
					<div className="grid grid-cols-3 gap-4">
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
								Date
							</label>
							<Field
								name="date"
								type="date"
								className="p-1 border border-gray-300 rounded-md w-full"
							/>
							{touched.date && errors.date && (
								<div className="text-danger text-sm">
									{typeof errors.date === "string" && errors.date}
								</div>
							)}
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Select Areas
						</label>
						<Select
							isMulti
							options={auditControlValvesData.map((area) => ({
								value: area.label,
								label: area.label,
							}))}
							value={selectedAreas}
							onChange={(selected) => {
								const updatedAreas = selected.map((area) => {
									const existingArea = values.areas.find(
										(a) => a.name === area.value
									);
									return (
										existingArea || {
											name: area.value,
											concerns: [{ concern: "", operator: "" }],
										}
									);
								});
								setSelectedAreas(selected || []);
								setFieldValue("areas", updatedAreas);
							}}
							className="w-full"
						/>
						{touched.areas && errors.areas && (
							<div className="text-danger text-sm">
								{typeof errors.areas === "string" && errors.areas}
							</div>
						)}
					</div>
					{selectedAreas.length > 0 && (
						<FieldArray name="areas">
							{({ remove }) => (
								<div className="space-y-6 bg-white">
									{values.areas.map((area, areaIndex) => (
										<div
											key={areaIndex}
											className="p-4 border border-gray-300 rounded-md shadow-md"
										>
											{/* Area name */}
											<div className="flex justify-between items-center">
												<h3 className="text-lg font-bold">{area.name}</h3>
												<div className="flex justify-between items-center">
													{/* Remove Area button */}
													<button
														type="button"
														className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
														onClick={() => {
															const updatedSelectedAreas = selectedAreas.filter(
																(selected) => selected.value !== area.name
															);
															setSelectedAreas(updatedSelectedAreas);
															remove(areaIndex);
														}}
													>
														Remove Area
													</button>
												</div>
											</div>

											<FieldArray name={`areas[${areaIndex}].concerns`}>
												{({ remove: removeConcern, push: pushConcern }) => (
													<div className="mt-4 space-y-4">
														{/* Label Row */}
														<div className="flex items-center gap-2 mb-2 font-semibold">
															<span className="w-2/3">Concern</span>
															<span className="w-1/3">Operator Signature</span>
															<span className="w-12">Action</span>
														</div>

														{/* Existing Fields */}
														{area.concerns?.map((concern, concernIndex) => (
															<div
																key={concernIndex}
																className="flex items-center gap-2 mb-2"
															>
																{/* Concern Field */}
																<Field
																	name={`areas[${areaIndex}].concerns[${concernIndex}].concern`}
																	placeholder="Enter Concerns Here...s"
																	component="textarea"
																	className="px-2 border border-gray-300 rounded-md w-2/3"
																/>
																{/* Operator Signature Field */}
																<Field
																	name={`areas[${areaIndex}].concerns[${concernIndex}].operator`}
																	placeholder="Operator Signature"
																	className="p-2 border border-gray-300 rounded-md w-1/3"
																/>
																{/* Remove Concern Button */}
																<button
																	type="button"
																	className="bg-secondary text-white py-2 ml-4 px-3 rounded hover:bg-danger"
																	onClick={() => removeConcern(concernIndex)}
																>
																	X{" "}
																</button>
															</div>
														))}

														{/* Add Concern Button */}
														<button
															type="button"
															className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-4"
															onClick={() =>
																pushConcern({ concern: "", operator: "" })
															}
														>
															Add Concern
														</button>
													</div>
												)}
											</FieldArray>
										</div>
									))}
								</div>
							)}
						</FieldArray>
					)}
					{selectedAreas.length > 0 && (
						<div>
							<label
								htmlFor="shift_manager"
								className="block text-sm font-medium text-gray-700"
							>
								SSM Signature
							</label>
							<InputSelectField
								operators={operators}
								values={values}
								setFieldValue={setFieldValue}
								id="ssm_signature"
								errors={errors}
								touched={touched}
							/>
						</div>
					)}

					<div className="flex justify-end mt-6">
						<button
							type="submit"
							className="bg-success text-white px-6 py-3 rounded hover:bg-successDark"
						>
							Submit
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default PortableElectricalEquipmentAudit;
