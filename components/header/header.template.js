export default function template() {
  return `
  <div class="bg-body-tertiary">
      <div class="container-md ">
          <nav class="navbar navbar-expand-lg ">
              <div class="container-fluid">
                  <a class="navbar-brand" role="button" id="logo">LMS</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <i class="bi bi-person-circle d-lg-none" id="profile-mobile" role="button" style="font-size: 2rem;"></i>
                  <div class="collapse navbar-collapse" id="navbarNav">
                      <ul class="navbar-nav">
                          <li class="nav-item">
                              <a class="nav-link pointer" role="button" id="home" aria-current="page">Home</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link pointer" role="button" id="classes">Classes</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link pointer" role="button" id="teachers">Teachers</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link pointer" role="button" id="students">Students</a>
                          </li>
                      </ul>
                  </div>
                  <i class="bi bi-person-circle d-none d-lg-block" id="profile" role="button" style="font-size: 2rem;"></i>
              </div>
          </nav>
      </div>
      </div>
  `;
}
