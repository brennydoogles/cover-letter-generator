<template>
  <div class="row">
    <div class="col">
      <nav role="navigation" class="navbar-nav">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" active-class="active">
              Cover Letter Generator
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/templates" class="nav-link" active-class="active">
              Template Manager
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/skills" class="nav-link" active-class="active">
              Skill Editor
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link" active-class="active">
              About Cover Letter Generator
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
