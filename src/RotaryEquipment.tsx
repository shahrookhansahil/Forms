import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { equipmentData, operators } from "./fakeData";
import InputSelectField from "./InputSelectField.tsx";
const RotaryEquipment = () => {
	const [selectedAreas, setSelectedAreas] = useState([]);

	const validationSchema = Yup.object({
		revisedBy: Yup.string()
			.required("Revised By is required")
			.oneOf(operators, "Invalid operator name"),
		group: Yup.string().required("Group is required"),
		time: Yup.date().required("Date  is required"),
		areas: Yup.array()
			.of(
				Yup.object({
					name: Yup.string().required(),
					selectedEquipments: Yup.array().min(
						1,
						"Select at least one equipment"
					),
				})
			)
			.required("Areas are required"),
		remarks: Yup.string().required("Remarks are required"),
	});

	const handleRemoveEquipment = (
		areaIndex,
		equipmentIndex,
		values,
		setFieldValue
	) => {
		const updatedSelectedEquipments = values.areas[
			areaIndex
		].selectedEquipments.filter((_, index) => index !== equipmentIndex);
		const updatedAreas = [...values.areas];
		updatedAreas[areaIndex].selectedEquipments = updatedSelectedEquipments;
		setFieldValue("areas", updatedAreas);
	};

	return (
		<Formik
			initialValues={{
				group: "",
				date: "",
				day: "",
				areas: [],
				additional_remarks: "",
				dcs_boardman: "",
				ssm_signature: "",
			}}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				const formData = {
					group: values.group,
					date: values.date,
					day: values.day,
					areas: values.areas.map((area) => ({
						name: area.name,
						equipments: area.selectedEquipments.map((equipmentIndex) => ({
							equipment: area.equipments[equipmentIndex].equipment,
							stopped: area.equipments[equipmentIndex].stopped,
							started: area.equipments[equipmentIndex].started,
							remarks: area.equipments[equipmentIndex].remarks,
						})),
					})),
					remarks: values.remarks,
				};

				console.log("Form Data with Selected Equipments:", formData);
			}}
		>
			{({ values, setFieldValue, errors, touched }) => (
				<Form className="p-4 space-y-6">
					<h2 className="text-xl font-bold text-center">
						Oxidation Plant - Rotary Equipment Fortnightly Change Over Record
						Sheet{" "}
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
							{touched.group && errors.group && (
								<div className="text-danger text-sm">{errors.group}</div>
							)}
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
							{touched.time && errors.time && (
								<div className="text-danger text-sm">{errors.time}</div>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Day
							</label>
							<Field
								as="select"
								name="day"
								className="p-1 border border-gray-300 rounded-md w-full"
							>
								<option value="" disabled>
									Select a Day
								</option>
								<option value="Monday">Monday</option>
								<option value="Tuesday">Tuesday</option>
								<option value="Wednesday">Wednesday</option>
								<option value="Thursday">Thursday</option>
								<option value="Friday">Friday</option>
								<option value="Saturday">Saturday</option>
								<option value="Sunday">Sunday</option>
							</Field>
							{touched.day && errors.day && (
								<div className="text-danger text-sm">{errors.day}</div>
							)}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Select Areas
						</label>
						<Select
							isMulti
							options={equipmentData.map((area) => ({
								value: area.label,
								label: area.label,
								equipments: area.equipments,
							}))}
							value={selectedAreas}
							onChange={(selected) => {
								const updatedAreas = selected.map((area) => {
									const existingArea = values.areas.find(
										(a) => a.name === area.value
									);
									if (existingArea) {
										return existingArea;
									}
									return {
										name: area.value,
										equipments: area.equipments.map((equipment) => ({
											equipment: equipment.equipment,
											stopped: "",
											started: "",
											remarks: "",
										})),
										selectedEquipments: area.equipments.map(
											(_, index) => index
										),
									};
								});

								setSelectedAreas(selected || []);
								setFieldValue("areas", updatedAreas);
							}}
							className="w-full"
						/>
						{touched.areas && errors.areas && (
							<div className="text-danger text-sm">{errors.areas}</div>
						)}
					</div>

					<FieldArray name="areas">
						{({ remove }) => (
							<div className="space-y-6 bg-white">
								{values.areas.map((area, areaIndex) => (
									<div
										key={areaIndex}
										className="p-4 border border-gray-300 rounded-md shadow-md"
									>
										<div className="flex justify-between items-center">
											<h3 className="text-lg font-bold">{area.name}</h3>

											<div className="flex justify-between items-center">
												<div className="flex items-center mr-2">
													{area.selectedEquipments.length <
														area.equipments.length && (
														<>
															<label className="block text-sm font-medium text-gray-700 w-64">
																Select Equipment:
															</label>
															<Select
																isMulti
																options={area.equipments.map(
																	(equipment, index) => ({
																		value: index,
																		label:
																			equipment.equipment ||
																			`Equipment ${index + 1}`,
																	})
																)}
																value={area.selectedEquipments.map((index) => ({
																	value: index,
																	label:
																		area.equipments[index]?.equipment ||
																		`Equipment ${index + 1}`,
																}))}
																onChange={(selected) => {
																	const selectedEquipmentIndexes = selected.map(
																		(s) => s.value
																	);
																	const updatedAreas = [...values.areas];
																	updatedAreas[areaIndex].selectedEquipments =
																		selectedEquipmentIndexes;
																	setFieldValue("areas", updatedAreas);
																}}
																className="w-full"
															/>
														</>
													)}
												</div>

												<button
													type="button"
													className="bg-danger text-white px-2 py-1 rounded hover:bg-dangerDark"
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

										<div className="mt-4 space-y-4">
											<div className="flex items-center gap-2 mb-2 font-semibold">
												<div className="text-sm text-gray-700 w-1/4">
													Equipment
												</div>
												<div className="text-sm text-gray-700 w-1/4">
													Stopped
												</div>
												<div className="text-sm text-gray-700 w-1/4">
													Started
												</div>
												<div className="text-sm text-gray-700 w-1/4">
													Remarks
												</div>
												<div>Remove</div>
											</div>

											{/* Map through selected equipment and display the equipment fields */}
											{area.selectedEquipments.map((equipmentIndex) => (
												<div
													key={equipmentIndex}
													className="flex items-center gap-2 mb-2"
												>
													<Field
														name={`areas[${areaIndex}].equipments[${equipmentIndex}].equipment`}
														placeholder="Equipment"
														className="p-2 border border-gray-300 rounded-md w-1/4"
														disabled
													/>
													<Field
														name={`areas[${areaIndex}].equipments[${equipmentIndex}].stopped`}
														placeholder="Stopped"
														className="p-2 border border-gray-300 rounded-md w-1/4"
													/>
													<Field
														name={`areas[${areaIndex}].equipments[${equipmentIndex}].started`}
														placeholder="Started"
														className="p-2 border border-gray-300 rounded-md w-1/4"
													/>
													<Field
														name={`areas[${areaIndex}].equipments[${equipmentIndex}].remarks`}
														placeholder="Remarks"
														className="p-2 border border-gray-300 rounded-md w-1/4"
													/>
													<button
														type="button"
														className="bg-danger text-white px-2 ml-4 rounded hover:bg-dangerDark"
														onClick={() => {
															const updatedSelectedEquipments =
																area.selectedEquipments.filter(
																	(index) => index !== equipmentIndex
																);
															const updatedAreas = [...values.areas];
															updatedAreas[areaIndex].selectedEquipments =
																updatedSelectedEquipments;
															setFieldValue("areas", updatedAreas);
														}}
													>
														X
													</button>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						)}
					</FieldArray>
					{selectedAreas.length > 0 && (
						<>
							<div className="col-span-2">
								<label
									htmlFor="additional_remarks"
									className="block text-sm font-medium"
								>
									Additional Remarks
								</label>
								<Field
									name="additional_remarks"
									as="textarea"
									rows="4"
									className="p-2 border border-gray-300 rounded-md w-full"
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
								<div>
									<label
										htmlFor="dcs_boardman"
										className="block text-sm font-medium text-gray-700"
									>
										DCS Boardman
									</label>
									<InputSelectField
										operators={operators}
										values={values}
										setFieldValue={setFieldValue}
										id="dcs_boardman"
										errors={errors}
										touched={touched}
									/>
								</div>
								<div>
									<label
										htmlFor="ssm_signature"
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
							</div>
						</>
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

export default RotaryEquipment;
