import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js"

import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dar2ness009@gmail.com", // Your Gmail address
    pass: "jyfulbugyeujbzzx", // Your app password
  },
})

function sendMail(to, sub, msg) {
  console.log("Attempting to send email to:", to)
  transporter.sendMail(
    {
      from: "dar2ness009@gmail.com", // Sender address
      to: to,
      subject: sub,
      html: msg,
    },
    (error, info) => {
      if (error) {
        console.error("Email error:", error)
      } else {
        console.log("Email sent:", info.response)
      }
    },
  )
}

// sendMail("singlaanmol23@gmail.com","Haan bhai","Kiase ho");

export const applyJob = async (req, res) => {
  try {
    const userId = req.id
    const jobId = req.params.id

    if (!jobId) {
      return res.status(404).json({
        message: "Job id is missing",
        seccess: false,
      })
    }
    const exsistingApplication = await Application.findOne({ job: jobId, applicant: userId })

    if (exsistingApplication) {
      return res.status(400).json({
        message: "you have already applied  to this job",
        success: false,
      })
    }

    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({
        message: "jOb not found",
        success: false,
      })
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    })
    job.applications.push(newApplication._id)
    await job.save()
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      })
    if (!application) {
      return res.status(404).json({
        message: "No application",
        seccess: false,
      })
    }

    return res.status(200).json({
      application,
      seccess: true,
    })
  } catch (error) {
    console.log(error)
  }
}

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    })
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        seccess: false,
      })
    }
    return res.status(200).json({
      job,
      seccess: true,
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    const applicationId = req.params.id
    // const userid= req.params.applicant;
    const app_lication = await Application.findById(applicationId)
      .populate({
        path: "applicant", // Populating the applicant field
        model: "User", // Specify the model to populate from (optional if it's inferred)
      })
      .sort({ createdAt: -1 })
      .populate({
        path: "job", // If you also want to populate job details in the application
        model: "Job", // Make sure to populate the job details as well
      })

    console.log(app_lication?.applicant?.email)
    sendMail(
      `${app_lication?.applicant?.email}`,
      `Hi ${app_lication?.applicant?.email}`,
      `You are hereby infrmed taht you have been ${status} from the job you applied`,
    )
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      })
    }

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId })
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      })
    }

    // update the status
    application.status = status.toLowerCase()
    await application.save()

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    })
  } catch (error) {
    console.log(error)
  }
}
