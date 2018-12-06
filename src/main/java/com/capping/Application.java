package com.capping;

import java.util.Date;
import com.capping.bean.PersonalInformation;
import com.capping.bean.EmployeeProgram;
import com.capping.bean.Employee;
import com.capping.bean.ActiveRequest;
import com.capping.bean.ValidProgram;
import com.capping.bean.Manage;
import com.capping.service.IPersonalInformationService;
import com.capping.service.IActiveRequestService;
import com.capping.service.IEmployeeProgramService;
import com.capping.service.IEmployeeService;
import com.capping.service.IManageService;
import com.capping.service.IValidProgramService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.capping.service.IPersonalInformationService;
import com.capping.service.IEmployeeProgramService;
import com.capping.service.IValidProgramService;
import com.capping.service.IActiveRequestService;
import com.capping.service.IManageService;
import com.capping.bean.ActiveRequest;
import java.security.Principal;
import java.util.List;
import java.util.LinkedList;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.json.JSONObject;

@RestController
@EnableOAuth2Sso
@SpringBootApplication
public class Application {

    @Autowired
    IPersonalInformationService personalInformationService;
    @Autowired
    IEmployeeProgramService employeeProgramService;
    @Autowired
    IEmployeeService employeeService;
    @Autowired
    IValidProgramService validProgramService;
    @Autowired
    IActiveRequestService activeRequestService;
    @Autowired
    IManageService manageService;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/api/username")
    public String getUsername(Principal principal) {
        return username(principal);
    }

    @GetMapping("/api/changeProfile")
    public Employee changeProfile(Principal principal, @RequestParam(value="workPhoneNumber") String workPhoneNumber,
            @RequestParam(value="biography") String biography, @RequestParam(value="firstName") String firstName,
            @RequestParam(value="lastName") String lastName) {
        Employee old = (Employee) employeeService.find(username(principal));
        old.firstName = firstName;
        old.lastName = lastName;
        old.workPhoneNumber = workPhoneNumber;
        old.biography = biography;
        return employeeService.save(old);
    }

    @PostMapping("/api/changeProfile")
    public Employee changeProfile(@RequestBody PersonalInformation personalInformation) {
        Employee old = (Employee) employeeService.find(personalInformation.username);
        old.updateValues(personalInformation);
        return employeeService.save(old);
    }

    @GetMapping("/api/employee/{username}")
    public @ResponseBody ResponseEntity<String> getEmployeeProfilePage(@PathVariable String username) {
        PersonalInformation personalInformation = (PersonalInformation) personalInformationService.find(username);
        return new ResponseEntity<String>(personalInformation.toString(),HttpStatus.OK);
    }

    @GetMapping("/api/myteam")
    public @ResponseBody ResponseEntity<String> getMyTeam(Principal principal) {
        Manage manager = (Manage) manageService.findByManagedUsername(principal.getName());
        List<Manage> managed;
        List<PersonalInformation> teammates = new LinkedList();
        if(manager == null) {
            managed = manageService.findByManagerUsername(username(principal));
            teammates.add((PersonalInformation) personalInformationService.find(username(principal)));
        } else {
            managed = manageService.findByManagerUsername(manager.managerUsername());
            teammates.add((PersonalInformation) personalInformationService.find(manager.managerUsername()));
        }
        for(String managedUsername : managed.stream().map(manage -> manage.managedUsername()).collect(Collectors.toList())) {
            teammates.add(personalInformationService.find(managedUsername));
        }
        return new ResponseEntity<String>(teammates.toString(), HttpStatus.OK);
    }

    @GetMapping("/api/advancedsearchemployee")
    public @ResponseBody ResponseEntity<String> getAdvancedSearchedEmployees(@RequestParam(value="city") String city,
            @RequestParam(value="username") String username, @RequestParam(value="firstName") String firstName,
            @RequestParam(value="lastName") String lastName, @RequestParam(value="jobTitle") String jobTitle,
            @RequestParam(value="workPhoneNumber") String workPhoneNumber) {
        List<PersonalInformation> personalInformationList = (List<PersonalInformation>) personalInformationService.findAll();
        List<PersonalInformation> validPersonalInformationList = new LinkedList<>();
        boolean flag = true;
        for(PersonalInformation p : personalInformationList) {
            flag = true;
            if(!username.equals("") && !p.username.equals(username)) { flag = false; }
            if(!city.equals("") && !p.city.equals(city)) { flag = false; }
            if(!firstName.equals("") && !p.firstName.equals(firstName)) { flag = false; }
            if(!lastName.equals("") && !p.lastName.equals(lastName)) { flag = false; }
            if(!jobTitle.equals("") && !p.jobTitle.contains(jobTitle)) { flag = false; }
            if(!workPhoneNumber.equals("") && !p.workPhoneNumber.equals(workPhoneNumber)) { flag = false; }
            if(flag) {validPersonalInformationList.add(p); }
       }
       return new ResponseEntity<String>(validPersonalInformationList.toString(), HttpStatus.OK);
    }

    @GetMapping("/api/searchemployee/{pSP}")
    public @ResponseBody ResponseEntity<String> getSearchedEmployees(@PathVariable("pSP") String plusSeperatedParameters) {
        List<PersonalInformation> personalInformationList = (List<PersonalInformation>) personalInformationService.findAll();
        String[] searchParameters = plusSeperatedParameters.split("\\+");
        return new ResponseEntity<String>(personalInformationList.stream()
                        .filter(info -> info.containsParameters(searchParameters))
                        .collect(Collectors.toList()).toString(),
                HttpStatus.OK);
    }

    @GetMapping("/api/myprograms")
    public @ResponseBody ResponseEntity<String> getEmployeePrograms(Principal principal) {
        String username = username(principal);
        List<EmployeeProgram> employeeProgramList = (List<EmployeeProgram>) employeeProgramService.findByUsername(username);
        return new ResponseEntity<String>(employeeProgramList.toString(),HttpStatus.OK);
    }

    @GetMapping("/api/programlist")
    public @ResponseBody ResponseEntity<String> getValidProgramList(Principal principal) {
        String username = username(principal);
        List<ValidProgram> validPrograms = (List<ValidProgram>) validProgramService.findAll();
        List<EmployeeProgram> employeeProgramList = (List<EmployeeProgram>) employeeProgramService.findByUsername(username);
        return new ResponseEntity<String>(validPrograms.stream()
                .filter(program -> !(program.isAlreadyAccessedByEmployee(employeeProgramList)))
                .collect(Collectors.toList())
                .toString(), HttpStatus.OK);
    }

    @GetMapping("/api/requestaccess/")
    public ActiveRequest newAccessRequest(@RequestParam(value="username") String username, @RequestParam(value="programId") int programId,
            @RequestParam(value="accessLevel") String accessLevel, @RequestParam(value="status") String status,
            @RequestParam(value="modifiedBy") String modifiedBy, @RequestParam(value="comment") String comment) {
        return activeRequestService.save(new ActiveRequest(new ActiveRequest.ActiveRequestId(username, programId, accessLevel, status, modifiedBy), new Date(),
            comment));
    }

    @PostMapping("/api/requestaccess/")
    public ActiveRequest newAccessRequest(@RequestBody ActiveRequest activeRequest) {
        return activeRequestService.save(activeRequest);
    }

    @GetMapping("/api/activerequests/")
    public @ResponseBody ResponseEntity<String> getActiveRequests(Principal principal) {
        String username = username(principal);
        List<Manage> managed = manageService.findByManagerUsername(username);
        List<ActiveRequest> activeRequests = new LinkedList<>();
        for(String managedUsername : managed.stream().map(manage -> manage.managedUsername()).collect(Collectors.toList())) {
            activeRequests.addAll(activeRequestService.findAllByUsername(managedUsername));
        }
        return new ResponseEntity<String>(activeRequests.toString(), HttpStatus.OK);
    }

    public String username(Principal principal) {
        return principal.getName().split("@")[0];
    }
}

