using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using QtechBackend.Models;
using QtechBackend.ServiceInterface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using QtechBackend.Interfaces;

namespace QtechBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QtechController : ControllerBase
    {
        private readonly IVideoService _videoService;
        private readonly IDocumentationService _documentationService;
        private readonly IPlaylistService _playlistService;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<QtechController> _logger;

        public QtechController(
            IVideoService videoService,
            IDocumentationService documentationService,
            IPlaylistService playlistService,
            IUserService userService,
            IConfiguration configuration,
            ILogger<QtechController> logger)
        {
            _videoService = videoService;
            _documentationService = documentationService;
            _playlistService = playlistService;
            _userService = userService;
            _configuration = configuration;
            _logger = logger;
        }

        #region Video Endpoints
        // GET: api/Qtech/Videos
        [HttpGet("Videos")]
        //[Authorize(Policy = "UserOnly")]
        public async Task<ActionResult<IEnumerable<Video>>> GetVideos()
        {
            try
            {
                var videos = await _videoService.GetVideosAsync();
                return Ok(videos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving videos");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // GET: api/Qtech/Videos/5
        [HttpGet("Videos/{id}")]
        //[Authorize(Policy = "UserOnly")]
        public async Task<ActionResult<Video>> GetVideo(int id)
        {
            try
            {
                var video = await _videoService.GetVideoByIdAsync(id);

                if (video == null)
                {
                    return NotFound(new { message = $"Video with ID {id} not found" });
                }

                return Ok(video);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving video with ID {VideoId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // POST: api/Qtech/Videos
        [HttpPost("Videos")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Video>> PostVideo([FromBody] Video video)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdVideo = await _videoService.AddVideoAsync(video);
                return CreatedAtAction(nameof(GetVideo), new { id = createdVideo.VideoId }, createdVideo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating video");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // PUT: api/Qtech/Videos/5
        [HttpPut("Videos/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PutVideo(int id, [FromBody] Video video)
        {
            try
            {
                if (id != video.VideoId)
                {
                    return BadRequest(new { message = "ID in URL does not match ID in the request body" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingVideo = await _videoService.GetVideoByIdAsync(id);
                if (existingVideo == null)
                {
                    return NotFound(new { message = $"Video with ID {id} not found" });
                }

                var updatedVideo = await _videoService.UpdateVideoAsync(video);
                return Ok(updatedVideo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating video with ID {VideoId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // PATCH: api/Qtech/Videos/5
        [HttpPatch("Videos/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PatchVideo(int id, [FromBody] Dictionary<string, object> patchData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingVideo = await _videoService.GetVideoByIdAsync(id);
                if (existingVideo == null)
                {
                    return NotFound(new { message = $"Video with ID {id} not found" });
                }

                var updatedVideo = await _videoService.PatchVideoAsync(id, patchData);
                return Ok(updatedVideo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while patching video with ID {VideoId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // DELETE: api/Qtech/Videos/5
        [HttpDelete("Videos/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteVideo(int id)
        {
            try
            {
                var existingVideo = await _videoService.GetVideoByIdAsync(id);
                if (existingVideo == null)
                {
                    return NotFound(new { message = $"Video with ID {id} not found" });
                }

                await _videoService.DeleteVideoAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting video with ID {VideoId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }
        #endregion

        #region Documentation Endpoints
        // GET: api/Qtech/Documentations
        [HttpGet("Documentations")]
        //[Authorize(Policy = "UserOnly")]
        public async Task<ActionResult<IEnumerable<Documentation>>> GetDocumentations()
        {
            try
            {
                var documentations = await _documentationService.GetDocumentationsAsync();
                return Ok(documentations);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving documentations");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // GET: api/Qtech/Documentations/5
        [HttpGet("Documentations/{id}")]
        //[Authorize(Policy = "UserOnly")]
        public async Task<ActionResult<Documentation>> GetDocumentation(int id)
        {
            try
            {
                var documentation = await _documentationService.GetDocumentationByIdAsync(id);

                if (documentation == null)
                {
                    return NotFound(new { message = $"Documentation with ID {id} not found" });
                }

                return Ok(documentation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving documentation with ID {DocumentationId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // POST: api/Qtech/Documentations
        [HttpPost("Documentations")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Documentation>> PostDocumentation([FromBody] Documentation documentation)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdDocumentation = await _documentationService.AddDocumentationAsync(documentation);
                return CreatedAtAction(nameof(GetDocumentation), new { id = createdDocumentation.DocId }, createdDocumentation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating documentation");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // PUT: api/Qtech/Documentations/5
        [HttpPut("Documentations/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PutDocumentation(int id, [FromBody] Documentation documentation)
        {
            try
            {
                if (id != documentation.DocId)
                {
                    return BadRequest(new { message = "ID in URL does not match ID in the request body" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingDocumentation = await _documentationService.GetDocumentationByIdAsync(id);
                if (existingDocumentation == null)
                {
                    return NotFound(new { message = $"Documentation with ID {id} not found" });
                }

                var updatedDocumentation = await _documentationService.UpdateDocumentationAsync(documentation);
                return Ok(updatedDocumentation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating documentation with ID {DocumentationId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // PATCH: api/Qtech/Documentations/5
        [HttpPatch("Documentations/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PatchDocumentation(int id, [FromBody] Dictionary<string, object> patchData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingDocumentation = await _documentationService.GetDocumentationByIdAsync(id);
                if (existingDocumentation == null)
                {
                    return NotFound(new { message = $"Documentation with ID {id} not found" });
                }

                var updatedDocumentation = await _documentationService.PatchDocumentationAsync(id, patchData);
                return Ok(updatedDocumentation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while patching documentation with ID {DocumentationId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // DELETE: api/Qtech/Documentations/5
        [HttpDelete("Documentations/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteDocumentation(int id)
        {
            try
            {
                var existingDocumentation = await _documentationService.GetDocumentationByIdAsync(id);
                if (existingDocumentation == null)
                {
                    return NotFound(new { message = $"Documentation with ID {id} not found" });
                }

                await _documentationService.DeleteDocumentationAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting documentation with ID {DocumentationId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }
        #endregion

        #region Playlist Endpoints
        // GET: api/Qtech/Playlists
        [HttpGet("Playlists")]
        //[Authorize(Policy = "UserOnly")]
        public async Task<ActionResult<IEnumerable<Playlist>>> GetPlaylists()
        {
            try
            {
                var playlists = await _playlistService.GetPlaylistsAsync();
                return Ok(playlists);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving playlists");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // GET: api/Qtech/Playlists/5
        [HttpGet("Playlists/{id}")]
        //[Authorize(Policy = "UserOnly")]
        public async Task<ActionResult<Playlist>> GetPlaylist(int id)
        {
            try
            {
                var playlist = await _playlistService.GetPlaylistByIdAsync(id);

                if (playlist == null)
                {
                    return NotFound(new { message = $"Playlist with ID {id} not found" });
                }

                return Ok(playlist);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving playlist with ID {PlaylistId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // POST: api/Qtech/Playlists
        [HttpPost("Playlists")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Playlist>> PostPlaylist([FromBody] Playlist playlist)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdPlaylist = await _playlistService.AddPlaylistAsync(playlist);
                return CreatedAtAction(nameof(GetPlaylist), new { id = createdPlaylist.PlaylistId }, createdPlaylist);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating playlist");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // PUT: api/Qtech/Playlists/5
        [HttpPut("Playlists/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PutPlaylist(int id, [FromBody] Playlist playlist)
        {
            try
            {
                if (id != playlist.PlaylistId)
                {
                    return BadRequest(new { message = "ID in URL does not match ID in the request body" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingPlaylist = await _playlistService.GetPlaylistByIdAsync(id);
                if (existingPlaylist == null)
                {
                    return NotFound(new { message = $"Playlist with ID {id} not found" });
                }

                var updatedPlaylist = await _playlistService.UpdatePlaylistAsync(playlist);
                return Ok(updatedPlaylist);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating playlist with ID {PlaylistId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // PATCH: api/Qtech/Playlists/5
        [HttpPatch("Playlists/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PatchPlaylist(int id, [FromBody] Dictionary<string, object> patchData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingPlaylist = await _playlistService.GetPlaylistByIdAsync(id);
                if (existingPlaylist == null)
                {
                    return NotFound(new { message = $"Playlist with ID {id} not found" });
                }

                var updatedPlaylist = await _playlistService.PatchPlaylistAsync(id, patchData);
                return Ok(updatedPlaylist);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while patching playlist with ID {PlaylistId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // DELETE: api/Qtech/Playlists/5
        [HttpDelete("Playlists/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeletePlaylist(int id)
        {
            try
            {
                var existingPlaylist = await _playlistService.GetPlaylistByIdAsync(id);
                if (existingPlaylist == null)
                {
                    return NotFound(new { message = $"Playlist with ID {id} not found" });
                }

                await _playlistService.DeletePlaylistAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting playlist with ID {PlaylistId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }
        #endregion

        #region User Endpoints
        // GET: api/Qtech/Users
        [HttpGet("Users")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            try
            {
                var users = await _userService.GetUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving users");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // GET: api/Qtech/Users/5
        [HttpGet("Users/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            try
            {
                var user = await _userService.GetUserByIdAsync(id);

                if (user == null)
                {
                    return NotFound(new { message = $"User with ID {id} not found" });
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving user with ID {UserId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // POST: api/Qtech/Users
        [HttpPost("Users")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Users>> PostUser([FromBody] Users user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdUser = await _userService.AddUserAsync(user);
                return CreatedAtAction(nameof(GetUser), new { id = createdUser.EmployeeId }, createdUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while creating user");
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // PUT: api/Qtech/Users/5
        [HttpPut("Users/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PutUser(int id, [FromBody] Users user)
        {
            try
            {
                if (id != user.EmployeeId)
                {
                    return BadRequest(new { message = "ID in URL does not match ID in the request body" });
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingUser = await _userService.GetUserByIdAsync(id);
                if (existingUser == null)
                {
                    return NotFound(new { message = $"User with ID {id} not found" });
                }

                var updatedUser = await _userService.UpdateUserAsync(user);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating user with ID {UserId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // PATCH: api/Qtech/Users/5
        [HttpPatch("Users/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PatchUser(int id, [FromBody] Dictionary<string, object> patchData)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingUser = await _userService.GetUserByIdAsync(id);
                if (existingUser == null)
                {
                    return NotFound(new { message = $"User with ID {id} not found" });
                }

                var updatedUser = await _userService.PatchUserAsync(id, patchData);
                return Ok(updatedUser);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while patching user with ID {UserId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        // DELETE: api/Qtech/Users/5
        [HttpDelete("Users/{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var existingUser = await _userService.GetUserByIdAsync(id);
                if (existingUser == null)
                {
                    return NotFound(new { message = $"User with ID {id} not found" });
                }

                await _userService.DeleteUserAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while deleting user with ID {UserId}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }
        #endregion

        // POST: api/Qtech/login
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var user = await _userService.AuthenticateUserAsync(loginModel.Email, loginModel.Password);

                if (user == null)
                {
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                var token = GenerateJwtToken(user);
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during login attempt for user {Email}", loginModel.Email);
                return StatusCode(500, new { message = "An error occurred while processing your request", error = ex.Message });
            }
        }

        private string GenerateJwtToken(Users user)
        {
            try
            {
                var jwtSettings = _configuration.GetSection("Jwt");
                var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Name, user.FirstName + " " + user.LastName),
                        new Claim(ClaimTypes.Role, user.Role)
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiresInMinutes"])),
                    Issuer = jwtSettings["Issuer"],
                    Audience = jwtSettings["Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while generating JWT token for user {Email}", user.Email);
                throw; // Re-throw to be caught by the calling method
            }
        }
    }
}