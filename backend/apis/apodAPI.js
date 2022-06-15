const asyncHandler = require('express-async-handler')
const axios = require('axios')

// @desc Get images from APOD API
// @route POST https://api.nasa.gov/planetary/apod
// @access Private
/*
  @params
  
  >date	YYYY-MM-DD	today	The date of the APOD image to retrieve
  
  >start_date	YYYY-MM-DD	none	The start of a date range, when requesting date for a range of dates. Cannot be used with date.
  
  >end_date	YYYY-MM-DD	today	The end of the date range, when used with start_date.

  >count	int	none	If this is specified then count randomly chosen images will be returned. Cannot be used with date or start_date and end_date.

  >thumbs	bool	False	Return the URL of video thumbnail. If an APOD is not a video, this parameter is ignored.

  >api_key	string	NASA_API_KEY	api.nasa.gov key for expanded usage
*/
exports.getApod = asyncHandler(async (options) => {
  const { count, date, start_date, end_date } = options

  const DATE = date ? `&date=${date}` : ''
  const START_DATE = start_date ? `&start_date=${start_date}` : ''
  const END_DATE = end_date ? `&end_date=${end_date}` : ''
  const COUNT = count ? `&count=${count}` : ''

  const response = await axios.get(
    `${process.env.NASA_APOD_URL}?api_key=${process.env.NASA_API_KEY}${DATE}${START_DATE}${END_DATE}${COUNT}`
  )
  return response.data
})
