import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { areaTagdata, operators } from "./fakeData";

const auditControlValvesData = areaTagdata.map((area) => ({
	...area,
	tags: area.tags.map((tag) => ({
		...tag,
		noPlate: "",
		isolationValve: "",
		bypass: "",
		operation: "",
		leakDetail: "",
		remarks: "",
	})),
}));
const SteamTrapAuditList = () => {
	const [selectedAreas, setSelectedAreas] = useState([]);
	const validationSchema = Yup.object({
		revisedBy: Yup.string()
			.required("Revised By is required")
			.oneOf(operators, "Invalid operator name"),
		group: Yup.string().required("Group is required"),
		time: Yup.date().required("Date & Time is required"),
		areas: Yup.array().required("Areas are required"),
		remarks: Yup.string().required("Remarks are required"),
	});

	const handleRemoveTag = (areaIndex, tagIndex, values, setFieldValue) => {
		const updatedSelectedTags = values.areas[areaIndex].selectedTags.filter(
			(selectedIndex) => selectedIndex !== tagIndex
		);
		const updatedAreas = [...values.areas];
		updatedAreas[areaIndex].selectedTags = updatedSelectedTags;
		setFieldValue("areas", updatedAreas);
	};
	return (
		<Formik
			initialValues={{
				auditFrequency: "",
				date: "",
				areas: [],
			}}
			// validationSchema={validationSchema}
			onSubmit={(values) => {
				const formData = {
					revisedBy: values.revisedBy,
					group: values.group,
					time: values.time,
					areas: values.areas.map((area) => ({
						name: area.name,
						tags: area.selectedTags.map((tagIndex) => ({
							tag: area.tags[tagIndex].tag,
							description: area.tags[tagIndex].description,
							noPlate: area.tags[tagIndex].noPlate,
							isolationValve: area.tags[tagIndex].isolationValve,
							bypassValve: area.tags[tagIndex].bypassValve,
							operation: area.tags[tagIndex].operationssss,
							leakDetail: area.tags[tagIndex].leakDetail,
							remarks: area.tags[tagIndex].remarks,
						})),
					})),
				};

				console.log("Form Data with Selected Tags:", formData);
			}}
		>
			{({ values, setFieldValue, errors, touched }) => (
				<Form className="p-4 space-y-6">
					<h2 className="text-xl font-bold text-center">
						STEAM TRAPS AUDITLIST{" "}
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="auditFrequency"
								className="block text-sm font-medium text-gray-700"
							>
								Audit Frequency
							</label>
							<Field
								name="auditFrequency"
								as="select"
								className="p-2 border border-gray-300 rounded-md w-full"
							>
								<option value="Monthly">Monthly</option>
								<option value="Quarterly">Quarterly</option>
								<option value="Yearly">Yearly</option>
							</Field>
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
								<div className="text-danger text-sm">{errors.date}</div>
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
								tags: area.tags,
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
										tags: area.tags.map((tag) => ({
											tag: tag.tag,
											description: tag.description,
											noPlate: "",
											isolationValve: "",
											bypass: "",
											operation: "",
											leakDetail: "",
											remarks: "",
										})),
										selectedTags: area.tags.map((_, index) => index), // Select all tags by default
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
													{area.selectedTags.length < area.tags.length && (
														<>
															<label className="block text-sm font-medium text-gray-700 w-32">
																Select Tags:
															</label>
															<Select
																isMulti
																options={area.tags.map((tag, index) => ({
																	value: index,
																	label: tag.tag || `Tag ${index + 1}`,
																}))}
																value={area.selectedTags.map((index) => ({
																	value: index,
																	label:
																		area.tags[index]?.tag || `Tag ${index + 1}`,
																}))}
																onChange={(selected) => {
																	const selectedTagIndexes = selected.map(
																		(s) => s.value
																	);
																	const updatedAreas = [...values.areas];
																	updatedAreas[areaIndex].selectedTags =
																		selectedTagIndexes;
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
											{touched.areas && errors.areas && (
												<div className="text-danger text-sm">
													{errors.areas}
												</div>
											)}
										</div>
										<div className="mt-4 space-y-4">
											<div className="flex items-center gap-2 mb-2 font-semibold">
												<div className="text-sm text-gray-700 w-1/5">Tag</div>
												<div className="text-sm text-gray-700 w-1/4 ml-2">
													Description
												</div>
												<div className="text-sm text-gray-700 w-1/5">
													DCS Signal
												</div>
												<div className="text-sm text-gray-700 w-1/5">
													isolationValve
												</div>
												<div className="text-sm text-gray-700 w-1/5">
													Bypass Valve
												</div>
												<div className="text-sm text-gray-700 w-1/5">
													Operation
												</div>
												<div className="text-sm text-gray-700 w-1/5">
													Leak Detail
												</div>
												<div className="text-sm text-gray-700 w-1/5">
													Remarks
												</div>
												<div className="">Remove</div>{" "}
											</div>

											{area.selectedTags.map((tagIndex) => (
												<div
													key={tagIndex}
													className="flex items-center gap-2 mb-2"
												>
													<Field
														name={`areas[${areaIndex}].tags[${tagIndex}].tag`}
														placeholder="Tag"
														className="p-2 border border-gray-300 rounded-md w-1/5"
													/>
													<Field
														name={`areas[${areaIndex}].tags[${tagIndex}].description`}
														placeholder="Description"
														className="p-2 border border-gray-300 rounded-md w-1/4"
													/>
													<Field
														name={`areas[${areaIndex}].tags[${tagIndex}].noPlate`}
														placeholder=" No Plate Condition"
														className="p-2 border border-gray-300 rounded-md w-1/5"
													/>
													<Field
														name={`areas[${areaIndex}].tags[${tagIndex}].isolationValve`}
														placeholder="  Isolation Valve"
														className="p-2 border border-gray-300 rounded-md w-1/5"
													/>
													<Field
														name={`areas[${areaIndex}].tags[${tagIndex}].bypass`}
														placeholder=" Bypass Valve"
														className="p-2 border border-gray-300 rounded-md w-1/5"
													/>
													<Field
														name={`areas[${areaIndex}].tags[${tagIndex}].operation`}
														placeholder=" Operations "
														className="p-2 border border-gray-300 rounded-md w-1/5"
													/>
													<Field
														name={`areas[${areaIndex}].tags[${tagIndex}].leakDetail`}
														placeholder="Leak Detail"
														className="p-2 border border-gray-300 rounded-md w-1/5"
													/>
													<Field
														name={`areas[${areaIndex}].tags[${tagIndex}].remarks`}
														placeholder="Remarks"
														className="p-2 border border-gray-300 rounded-md w-1/5"
													/>

													<button
														type="button"
														className="bg-danger text-white px-2 ml-4 rounded hover:bg-dangerDark"
														onClick={() =>
															handleRemoveTag(
																areaIndex,
																tagIndex,
																values,
																setFieldValue
															)
														}
													>
														X
													</button>
												</div>
											))}
										</div>
										{!area.selectedTags.length && (
											<div className="mt-4">
												<Select
													options={area.tags.map((tag, index) => ({
														value: index,
														label: tag.tag || `Tag ${index + 1}`,
													}))}
													onChange={(selected) => {
														const selectedTagIndexes = selected.map(
															(s) => s.value
														);
														const updatedAreas = [...values.areas];
														updatedAreas[areaIndex].selectedTags =
															selectedTagIndexes;
														setFieldValue("areas", updatedAreas);
													}}
													className="w-full"
												/>
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</FieldArray>

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

export default SteamTrapAuditList;
