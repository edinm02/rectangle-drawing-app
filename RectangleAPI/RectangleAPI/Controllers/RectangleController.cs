using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RectangleAPI.Models;
using RectangleAPI.Services;

namespace RectangleAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class RectangleController : ControllerBase
    {
        private readonly RectangleService _rectangleService;

        public RectangleController(RectangleService rectangleService)
        {
            _rectangleService = rectangleService;
        }

        [HttpGet("initial-dimensions")]
        public async Task<ActionResult<Rectangle>> GetInitialDimensions()
        {
            return await _rectangleService.GetInitialDimensionsAsync();
        }

        [HttpPut("update-dimensions")]
        public async Task<IActionResult> UpdateDimensions([FromBody] Rectangle dimensions)
        {
            if (dimensions == null)
            {
                return BadRequest("Invalid dimensions data.");
            }

            try
            {             
                await _rectangleService.UpdateDimensionsAsync(dimensions);
                return NoContent(); // HTTP 204 No Content
            }
            catch (Exception ex)
            {              
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating dimensions.");
            }
        }      
    }
}
