import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./AgencyForm.css"; // Import your custom CSS
import { useForm } from "react-hook-form";

export const AgencyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    console.log(data);
  };
  const validationSchema = {
    validationAdTitle: {
      required: {
        value: true,
        message: "*Please Enter Ad Title",
      },
    },
    validationCampaignName: {
      required: {
        value: true,
        message: "*Please Enter Campaign Name",
      },
    },
    validationAdDescription: {
      required: {
        value: true,
        message: "*Please Enter Ad Description",
      },
    },

    validationURL: {
      required: {
        value: true,
        message: "*Please Enter Your URL ",
      },
    },
    validationTBudget: {
      required: {
        value: true,
        message: "*Please Enter Total Budget",
      },
    },
    validationDBudget: {
      required: {
        value: true,
        message: "*Please Enter Daily Budget",
      },
    },
  };

  return (
    <div className="container mt-5 form-container">
      <form onSubmit={handleSubmit(submitHandler)}>
        <h2 className="text-center mb-4">Create Your Campaign</h2>
        <hr />
        {/* Section: Ad Details */}
        <h4 className="mb-4 section-title">Ad Details</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="adTitle" className="form-label">
              Ad Title
            </label>
            <input
              type="text"
              className="form-control"
              id="adTitle"
              placeholder="Enter Ad Title"
              {...register("AdTitle", validationSchema.validationAdTitle)}
            />
            <span className="errormsg">{errors.AdTitle?.message}</span>
          </div>
          <div className="col-md-6">
            <label htmlFor="campaignName" className="form-label">
              Campaign Name
            </label>
            <input
              type="text"
              className="form-control"
              id="campaignName"
              placeholder="Enter Campaign Name"
              {...register(
                "CampaignName",
                validationSchema.validationCampaignName
              )}
            />
            <span className="errormsg">{errors.CampaignName?.message}</span>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="adType" className="form-label">
              Ad Type
            </label>
            <select className="form-select" id="adType" {...register("adType")}>
              <option value="">Select Ad Type</option>
              <option value="banner">Banner</option>
              <option value="video">Video</option>
              <option value="Popup">Pop-Up</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="adDescription" className="form-label">
            Ad Description
          </label>
          <textarea
            className="form-control"
            id="adDescription"
            rows="3"
            placeholder="Enter ad description..."
            {...register(
              "AdDescription",
              validationSchema.validationAdDescription
            )}
          ></textarea>
          <span className="errormsg">{errors.AdDescription?.message}</span>
        </div>
        {/* Section: Media */}
        <h4 className="mb-4 section-title">Media</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="fileUpload" className="form-label">
              Upload File
            </label>
            <input type="file" className="form-control" id="fileUpload" />
          </div>
          <div className="col-md-6">
            <label htmlFor="url" className="form-label">
              Add Your URL
            </label>
            <div className="input-group">
              <span className="input-group-text">
                https://example.com/users/
              </span>
              <input
                type="text"
                className="form-control"
                id="url"
                placeholder="Your unique URL path"
                {...register("URL", validationSchema.validationURL)}
              />
              <span className="errormsg">{errors.URL?.message}</span>
            </div>
          </div>
        </div>
        {/* Section: Target Audience */}
        <h4 className="mb-4 section-title">Target Audience</h4>
        <fieldset className="mb-3">
          <legend className="col-form-label pt-0">Select Age Range</legend>
          <div className="row">
            <div className="col-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ageRange1"
                  value={"5-18"}
                  {...register("ageRange")}
                />
                <label className="form-check-label" htmlFor="ageRange1">
                  5-18
                </label>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ageRange2"
                  value={"18-25"}
                  {...register("ageRange")}
                />
                <label className="form-check-label" htmlFor="ageRange2">
                  18-25
                </label>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ageRange3"
                  value={"25-40"}
                  {...register("ageRange")}
                />
                <label className="form-check-label" htmlFor="ageRange3">
                  25-40
                </label>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ageRange4"
                  value={"40-60"}
                  {...register("ageRange")}
                />
                <label className="form-check-label" htmlFor="ageRange4">
                  40-60
                </label>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="ageRange5"
                  value={"60+"}
                  {...register("ageRange")}
                />
                <label className="form-check-label" htmlFor="ageRange5">
                  60+
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="mb-4">
          <legend className="col-form-label pt-0">Select Gender</legend>
          <div className="row">
            <div className="col-sm-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderMale"
                  value="male"
                  {...register("gender")}
                />
                <label className="form-check-label" htmlFor="genderMale">
                  Male
                </label>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderFemale"
                  value="female"
                  {...register("gender")}
                />
                <label className="form-check-label" htmlFor="genderFemale">
                  Female
                </label>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderBoth"
                  value="both"
                  {...register("gender")}
                />
                <label className="form-check-label" htmlFor="genderBoth">
                  Both
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        {/* Section: Budget & Schedule */}
        <h4 className="mb-4 section-title">Budget & Schedule</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="totalBudget" className="form-label">
              Total Budget
            </label>
            <input
              type="text"
              className="form-control"
              id="totalBudget"
              placeholder="Enter Total Budget"
              {...register("TBudget", validationSchema.validationTBudget)}
            />
            <span className="errormsg">{errors.TBudget?.message}</span>
          </div>
          <div className="col-md-6">
            <label htmlFor="dailyBudget" className="form-label">
              Daily Budget
            </label>
            <input
              type="text"
              className="form-control"
              id="dailyBudget"
              placeholder="Enter Daily Budget"
              {...register("DBudget", validationSchema.validationDBudget)}
            />
            <span className="errormsg">{errors.DBudget?.message}</span>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="adStartDate" className="form-label">
              Ad Starting Date & Time:
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="adStartDate"
              name="adStartDate"
              {...register("startingDateTime")}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="adEndDate" className="form-label">
              Ad Ending Date & Time:
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="adEndDate"
              name="adEndDate"
              {...register("endingDateTime")}
            />
          </div>
        </div>
        {/* Section: Ad Placement Options */}
        <h4 className="mb-4 section-title">Ad Placement Options</h4>
        <fieldset className="mb-4">
          <div className="row">
            <div className="col-sm-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="placementGoogle"
                  value={"googleAds"}
                  {...register("adPlacementOptions")}
                />

                <label className="form-check-label" htmlFor="placementGoogle">
                  Google Ads
                </label>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="placementFacebook"
                  value={"facebook"}
                  {...register("adPlacementOptions")}
                />
                <label className="form-check-label" htmlFor="placementFacebook">
                  Facebook
                </label>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="placementInstagram"
                  value={"instagram"}
                  {...register("adPlacementOptions")}
                />
                <label
                  className="form-check-label"
                  htmlFor="placementInstagram"
                >
                  Instagram
                </label>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="placementLinkedIn"
                  value={"linkedIn"}
                  {...register("adPlacementOptions")}
                />
                <label className="form-check-label" htmlFor="placementLinkedIn">
                  LinkedIn
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        {/* Section: Additional Information */}
        <h4 className="mb-4 section-title">Additional Information</h4>
        <div className="mb-4">
          <label htmlFor="additionalNotes" className="form-label">
            Additional Notes/Instructions
          </label>
          <textarea
            className="form-control"
            id="additionalNotes"
            rows="3"
            placeholder="Enter any additional instructions..."
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
